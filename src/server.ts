import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";

import router from "./routes";
import socketConnection from "./sockets";
import roomsSocket from "./sockets/rooms.socket";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running :)");
});

app.use(errorHandler);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
});

io.use((socket, next) => {
  const auth = socket.handshake.headers.authorization;
  // check auth
  next();
});

const baseIO = io.of("/");
const roomIO = io.of("/rooms");

baseIO.on("connection", (socket) => {
  console.log("a user connected");
  socketConnection(baseIO, socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

roomIO.on("connection", (socket) => {
  const roomId = socket.handshake.query.roomId as string;
  const user = socket.handshake.query.user as string;
  const rooms = ["room1"];
  console.log(`${user} connected to room ${rooms[+roomId]}`);
  roomsSocket.joinRoom(socket, rooms[+roomId]);
  socket.on("chat", (message) => {
    roomsSocket.sendMessage(socket, rooms[+roomId], user, message);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected from rooms");
  });
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running on ${port}`);
});

// For integration testing
export default app;
