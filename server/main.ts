import { Server } from "socket.io";

const io = new Server();

// read users file
let users = require("./users");
console.info("read users storage file");

// init online user list
let online_users: any = [];

// when connected
io.on("connection", (socket) => {
    // show connected socket
    console.info(`${socket.id}: connected`);

    // show disconnect message
    socket.on("disconnect", () => {
        console.info(`${socket.id}: disconnected`)
        for (let i: number = 0; i < online_users.length; ++i) {
            if (online_users[i].socketid == socket.id) {
                console.info(`${socket.id}: ${online_users[i].uid}: ${online_users[i].name} logout`)
                online_users.splice(i, 1);
                break;
            }
        }
    });

    // login
    socket.on("login", ({ uid, password }) => {
        console.info(`${socket.id}: uid: ${uid} password: ${password} try to login`);
        for (let user of users) {
            if (user.uid == uid && user.password == password) {
                // check if already online
                for (let ou of online_users) {
                    if (ou.uid == uid) {
                        console.info(`${socket.id}: ${uid} already logined`);
                        socket.emit("failed");
                        return;
                    }
                    if (ou.socketid == socket.id) {
                        console.info(`${socket.id}: same socket login again`);
                        socket.emit("failed");
                        return;
                    }
                }
                // add to online users
                online_users.push({ "name": user.name, "uid": user.uid, "socketid": socket.id });
                console.info(`${socket.id}: ${uid}: ${user.name}: logined`);
                socket.emit("success");
                return;
            }
        }
        console.info(`${socket.id}: uid: ${uid} login failed`);
        socket.emit("failed");
    });

});

// listen on port 3000
io.listen(3000);
console.info("started listening at *:3000");
