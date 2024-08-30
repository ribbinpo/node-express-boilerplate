import { Socket } from "socket.io";

const emitEvent = (socket: Socket, arg: string) => {
  console.log(arg);
  socket.emit("event:emit", `Server received: ${arg}`);
};

const emitEventConnection = (socket: Socket) => {
  socket.on("event:emit", (arg: string) => emitEvent(socket, arg));
};

export default emitEventConnection;
