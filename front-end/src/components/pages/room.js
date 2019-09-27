import React, { useState } from 'react'

import Start from "../rooms/00-Start"
import One from "../rooms/01"

export default function room(props) {
    const [player] = useState(props.player)
    const [character, updateCharacter] = useState(props.character)

    const updateRoom = (room) => {
        let updatedCharacter = {}
        Object.assign(updatedCharacter, character)
        updatedCharacter.room = room
        updateCharacter(updatedCharacter)
    }

    const handleSave = () => {
        fetch(`http://127.0.0.1:5000/users/save/${player.username}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                save: character
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            fetch(`http://127.0.0.1:5000/characters/update/${character.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    user: character.user,
                    name: character.name,
                    total_hitpoints: character.total_hitpoints,
                    current_hitpoints: character.current_hitpoints,
                    armor: character.armor,
                    attack: character.attack,
                    items: character.items,
                    room: character.room
                })
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
        })
        .catch(error => {
            console.log(error)
        });
    }

    const rooms = {
        0: <Start updateRoom={updateRoom} updateCharacter={updateCharacter}/>,
        1: <One updateRoom={updateRoom} updateCharacter={updateCharacter}/>,
        2: ""
    }

    return (
        <div>
            <h2>Character: {character.name}</h2>
            <button onClick={handleSave}>Save</button>
            {rooms[character.room]}
        </div>
    )
}