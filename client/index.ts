import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
socket.on("connect", () => {
    socket.emit("login", { uid: "404-3", password: "1qazxsw2" });
    socket.disconnect();
});
