import { useState, useEffect, useMemo } from "react";
enum EEventType {
  SendMessage = "SEND_MESSAGE",
  Command = "COMMAND",
}
// Define a conditional type based on EEventType
type TPayloadTypeMap = {
  [EEventType.SendMessage]: string;
  [EEventType.Command]: number;
};

type TPayload = {
  message: string;
};
type TWebSocketData = {
  type: EEventType;
  payload: TPayload;
};

// Define a helper function to determine the payload type based on the event type
const getPayloadType = (type: EEventType): keyof TPayloadTypeMap => {
  return type;
};
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
      // event data is a JSON string
      const jsonEvent: TWebSocketData = JSON.parse(event?.data);
      if (jsonEvent?.type === EEventType.SendMessage) {
        const nextMessage = jsonEvent?.payload?.message;
        console.log("Received message:", nextMessage);
        setMessages((prev) => [...prev, nextMessage]);
      }
    };

    return () => {
      console.log("Closing the connections...");
      socket.close();
    };
  }, [url]);

  return { socket, messages };
};

export default useWebsocket;
