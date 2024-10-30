// src/socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    // Initialize the socket connection only if it doesn't already exist
    socket = io("http://localhost:3000", {
      withCredentials: true,
    });
  } else if (!socket.connected) {
    // Reconnect if the socket instance exists but is not connected
    socket.connect();
  }
  return socket;
};
