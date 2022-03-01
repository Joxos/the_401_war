import { verify } from "crypto";
import { Server } from "socket.io";
let fs = require("fs");

const io = new Server();

// read users file
let users: any;
fs.readFile('./users.json', 'utf8', (err: string, data: string) => {
    if (err) {
        console.info(`error reading users file: ${err}`);
    } else {
        users = JSON.parse(data);
    }
    console.info(`read users storage file:\n${JSON.stringify(users, null, 2)}\n`);
});

// when connected
io.on("connection", (socket) => {
    console.info(`${socket.id} connected`);

    socket.on("disconnect", () => {
        console.info(`${socket.id} disconnected`)
    });

    function verifyLogin(uid: string, password: string) {
        for (let user of users) {
            if (user.get("uid") == uid && user.get("password") == password) {
                return true;
            }
        }
        return false;
    };
    socket.on("login", (uid, password) => {
        console.info(`${socket.id}: login\n  uid: ${uid}\n  password: ${password}`)
        if (verifyLogin(uid, password)) {
            socket.emit("success");
        } else {
            socket.emit("failed");
        }
    });

});

// listen on port 3000
io.listen(3000);
console.info("started listening at *:3000\n");
