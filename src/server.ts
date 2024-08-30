import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";

import router from "./routes";
import socketConnection from "./sockets";
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
}).of("/room");

io.use((socket, next) => {
  const auth = socket.handshake.headers.authorization;
  // check auth
  next();
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socketConnection(io, socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running on ${port}`);
});

// For integration testing
export default app;
