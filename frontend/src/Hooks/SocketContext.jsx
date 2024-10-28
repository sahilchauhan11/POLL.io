// Example for SocketContext.jsx
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { getSocket } from '../socket.js'; // Ensure getSocket returns a singleton socket instance.

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(getSocket()); // Use ref to store the socket instance

  useEffect(() => {
    const socket = socketRef.current;

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
