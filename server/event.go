package main

import (
	"bytes"
	"encoding/json"
	"fmt"
)

// Event is the Messages sent over the websocket
// Used to differ between different actions
type Event struct {
	// Type is the message type sent
	Type string `json:"type"`
	// Payload is the data Based on the Type
	Payload json.RawMessage `json:"payload"`
}

const (
	// EventSendMessage is the event name for new chat messages sent
	EventSendMessage = "SEND_MESSAGE"
	EventCommand     = "COMMAND"
)

// SendMessageEvent is the payload sent in the
// send_message event
type SendMessageEvent struct {
	Message string `json:"message"`
	From    string `json:"from"`
}

func eventHandler(message []byte) []byte {
	message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
	messageStr := string(message)
	var messageType string
	if len(messageStr) > 0 && messageStr[0] == '/' {
		messageType = EventCommand
	} else {
		messageType = EventSendMessage
	}
	data := map[string]interface{}{
		"type": messageType,
		"payload": map[string]interface{}{
			"message": messageStr,
		},
	}
	// Marshal the data to a byte slice
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Error:", err)
	}
	// Convert the byte slice to a string
	jsonString := string(jsonData)
	message = []byte(jsonString)
	return message
}
