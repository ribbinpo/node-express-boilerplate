import { Namespace, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const sendAllConnectedClient = (
  io: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.emit("all-connected-client", "All connected client");
};

const sendAllConnectedClientExceptSender = (socket: Socket) => {
  socket.broadcast.emit(
    "all-connected-client-except-sender",
    "All connected client except sender"
  );
};

export default {
  sendAllConnectedClient,
  sendAllConnectedClientExceptSender,
};
