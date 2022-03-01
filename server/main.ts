import { Server } from "socket.io"

const io = new Server()

io.on("connection", (socket) => {
    console.info(`${socket.id} connected`)

    socket.on("disconnect", () => {
        console.info(`${socket.id} disconnected`)
    })

    socket.on("login", (uid, password) => {
        console.info(`${socket.id}: login\n  uid: ${uid}\n  password: ${password}`)
    })
})

io.listen(3000)
