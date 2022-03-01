import { Server } from "socket.io";
let fs = require("fs");

const io = new Server();

// read users file
let users = require("./users");
console.info(`read users storage file:\n${JSON.stringify(users, null, 2)}\n`);

// when connected
io.on("connection", (socket) => {
    // show connected socket
    console.info(`${socket.id} connected`);

    // show disconnect message
    socket.on("disconnect", () => {
        console.info(`${socket.id} disconnected`)
    });

    // verify login
    function verifyLogin(uid: string, password: string) {
        for (let user of users) {
            if (user["uid"] == uid && user["password"] == password) {
                return true;
            }
        }
        return false;
    };
    socket.on("login", ({ uid, password }) => {
        console.info(`${socket.id}: login\n  uid: ${uid}\n  password: ${password}`);
        if (verifyLogin(uid, password)) {
            console.info(`${socket.id}: login success`);
            socket.emit("success");
        } else {
            console.info(`${socket.id}: login failed`);
            socket.emit("failed");
        }
    });
});

// listen on port 3000
io.listen(3000);
console.info("started listening at *:3000\n");
