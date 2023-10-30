package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var dndAPIUrl = "https://www.dnd5eapi.co/api"

func getSpell(spellName string) (Spell, error) {
	// Construct the full URL
	fullURL := fmt.Sprintf("%s/spells/%s", dndAPIUrl, spellName)

	// Make the GET request
	response, err := http.Get(fullURL)
	if err != nil {
		return Spell{}, fmt.Errorf("Error making GET request: %s", err)
	}
	defer response.Body.Close()

	// Check the status code
	if response.StatusCode != http.StatusOK {
		switch response.StatusCode {
		case 404:
			return Spell{}, fmt.Errorf("ERROR: The spell you have requested does not exist")
		default:
			return Spell{}, fmt.Errorf("Received non-200 status code: %d", response.StatusCode)
		}
	}

	// Decode the JSON response
	var spell Spell
	if err := json.NewDecoder(response.Body).Decode(&spell); err != nil {
		return Spell{}, fmt.Errorf("Error decoding response: %s", err)
	}
	return spell, nil
}
