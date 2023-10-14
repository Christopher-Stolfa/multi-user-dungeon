import { useState, useEffect, useMemo } from "react";

const useWebsocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket(url);
    console.log("Attempting Connection...");

    socket.onopen = () => {
      setSocket(socket);
      console.log("Successfully Connected");
    };

    socket.onclose = (event) => {
      console.log("Socket Closed Connection: ", event);
      socket.send("Client Closed!");
    };

    socket.onerror = (error) => {
      console.log("Socket Error: ", error);
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      const response = event.data;
      // Handle the response from the server here
      console.log("Received response:", response);
      setMessages((prev) => [...prev, response]);
    };

    return () => {
      console.log("Closing the connections...");
      socket.close();
    };
  }, [url]);

  return { socket, messages };
};

export default useWebsocket;
