import express from "express";
import ServerConfig from "./Config/ServerConfig";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import roomHandler from "./Handlers/RoomHandler";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  roomHandler(socket); // pass the socket instance of a new user  to the roomHandler
  socket.on("Disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
server.listen(ServerConfig.PORT, () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
  console.log(`http://localhost:${ServerConfig.PORT}`);
});
