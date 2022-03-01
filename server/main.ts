import { Server } from "socket.io";
let fs = require("fs");

const io = new Server();
let users = "";
fs.readFile('./users.json', 'utf8', (err: string, data: string) => {
    if (err) {
        console.info(`error reading users file: ${err}`);
    } else {
        users = JSON.parse(data);
    }
    console.info(`read users storage file:\n${JSON.stringify(users, null, 2)}\n`);
});

io.on("connection", (socket) => {
    console.info(`${socket.id} connected`);

    socket.on("disconnect", () => {
        console.info(`${socket.id} disconnected`)
    });

    function verifyLogin(uid: string, password: string) {

    };
    socket.on("login", (uid, password) => {
        console.info(`${socket.id}: login\n  uid: ${uid}\n  password: ${password}`)
    });

});

io.listen(3000);
console.info("started listening at *:3000\n");
