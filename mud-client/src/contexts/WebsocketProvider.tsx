import React, { createContext, useContext, ReactNode } from "react";
import useWebsocket from "@/hooks/useWebsocket";

interface WebsocketContextType {
  socket: WebSocket | null;
  messages: string[];
}

const WebsocketContext = createContext<WebsocketContextType | undefined>(
  undefined
);

export const useWebsocketContext = () => {
  const context = useContext(WebsocketContext);
  if (!context) {
    throw new Error(
      "useWebsocketContext must be used within a WebsocketProvider"
    );
  }
  return context;
};

interface WebsocketProviderProps {
  children: ReactNode;
}

export const WebsocketProvider: React.FC<WebsocketProviderProps> = ({
  children,
}) => {
  const websocket = useWebsocket("ws://localhost:8080/ws"); // Set your URL here
  return (
    <WebsocketContext.Provider value={websocket}>
      {children}
    </WebsocketContext.Provider>
  );
};
