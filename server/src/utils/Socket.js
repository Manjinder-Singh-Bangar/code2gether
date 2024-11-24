import { Server } from "socket.io";
import http from "http"
import express from "express";

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }

})

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId]
}



// Used to show online users
const userSocketMap = {}

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`)

    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id
    console.log("userSocketMap[userId] ", userSocketMap[userId])

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { app, server, io }