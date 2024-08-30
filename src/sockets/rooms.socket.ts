import { Socket } from "socket.io";

const joinRoom = (socket: Socket, roomId: string) => socket.join(roomId);

const leaveRoom = (socket: Socket, roomId: string) => socket.leave(roomId);

// Boardcast to all clients in the room
// io.to("some room").emit("some event");
// io.except("some room").emit("some event");
// io.to("some room").to("some room").emit("some event");

const sendMessage = (socket: Socket, roomId: string, send: string, message: string) => {
  socket.to(roomId).emit("chat", message);
};

export default {
  joinRoom,
  leaveRoom,
  sendMessage,
};
