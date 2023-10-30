package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"
)

type Payload struct {
	Data    any    `json:"data"`
	Message string `json:"message"`
	Error   string `json:"error"`
}

// Event is the Messages sent over the websocket
// Used to differ between different actions
type Event struct {
	// Type is the message type sent
	Type string `json:"type"`
	// Payload is the data Based on the Type
	Payload Payload `json:"payload"`
}

const (
	// EventSendMessage is the event name for new chat messages sent
	EventSendMessage = "SEND_MESSAGE"
	EventCommand     = "COMMAND"
)

// TODO: If there is an error when making a command, only broadcast the error to the client making the request
func handleCommandEvent(message string) Payload {
	parts := strings.Split(message, " ")
	command := parts[0][1:]
	arg := ""
	var data any
	var err error = nil
	payload := Payload{
		Message: message,
	}
	if len(parts) >= 2 {
		arg = parts[1]
	}
	switch command {
	case "getSpell":
		fmt.Println("gets a spell")
		data, err = getSpell(arg)
		payload.Data = data
	case "getItem":
		fmt.Println("gets an item")
		data = message
	default:
		data = message
	}
	if err != nil {
		fmt.Println(err)
		payload.Error = err.Error()
	}
	return payload
}

func createEvent(message []byte) Event {
	message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
	messageStr := string(message)
	messageType := EventSendMessage
	payload := Payload{
		Message: messageStr,
		Data:    messageStr,
	}
	if len(messageStr) > 0 && messageStr[0] == '/' {
		messageType = EventCommand
		payload = handleCommandEvent(messageStr)
	}

	data := Event{
		Type:    messageType,
		Payload: payload,
	}
	return data
}

func prepareMessageEvent(message []byte) []byte {
	data := createEvent(message)
	// Marshal the data to a byte slice
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Error:", err)
	}
	return jsonData
}
