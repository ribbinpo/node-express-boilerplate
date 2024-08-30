import { Namespace, Socket } from "socket.io";

import emitEventConnection from "./emitEvent.socket";
import boardcastEventConnection from "./boardcastEvent.socket";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const socketConnection = (
  io: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket
) => {
  emitEventConnection(socket);
  boardcastEventConnection.sendAllConnectedClient(io);
  boardcastEventConnection.sendAllConnectedClientExceptSender(socket);
};

export default socketConnection;
