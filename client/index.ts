import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
socket.on("connect", () => {
    socket.emit("login", { uid: 457777, password: "spq457777" });
    socket.disconnect();
});
