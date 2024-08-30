import { Socket } from "socket.io";

import emitEventConnection from "./emitEvent.socket";

const socketConnection = (socket: Socket) => {
  emitEventConnection(socket);
};

export default socketConnection;
