import React, { useState } from 'react'

import Start from "../rooms/00-Start"
import WinFight from "../rooms/winFight"
import One from "../rooms/01"
import Two from "../rooms/02"

export default function room(props) {
    const [player] = useState(props.player)
    const [character, updateCharacter] = useState(props.character)
    const [previousRoom, updatePreviousRoom] = useState(0)

    const updateRoom = (room) => {
        // let updatedCharacter = {}
        updatePreviousRoom(character.room)
        // Object.assign(updatedCharacter, character)
        // updatedCharacter.room = room
        character.room = room
        updateCharacter(character)
    }

    const handleFight = (mob) => {
        const fight = (character, mob) => {
            while (character.current_hitpoints > 0 && mob.hitpoints > 0) {
                console.log(mob.hitpoints);
                console.log(character.current_hitpoints);
                
                character.current_hitpoints -= mob.attack
                mob.hitpoints -= character.attack
            }
    
            return character
        }

        const fightResult = fight(character, mob)

        if (fightResult.current_hitpoints > 0) {
            console.log("You won!")
            fightResult.items["rustyKey"] = true
            updateCharacter(fightResult)
            updateRoom("winFight")
        }
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

    const roomFunctions = {
        updateRoom: updateRoom,
        updateCharacter: updateCharacter,
        handleFight: handleFight
    }

    const rooms = {
        winFight: <WinFight character={character} previousRoom={previousRoom} roomFunctions={roomFunctions}/>,
        0: <Start character={character} roomFunctions={roomFunctions}/>,
        1: <One character={character} roomFunctions={roomFunctions}/>,
        2: <Two character={character} roomFunctions={roomFunctions}/>,
    }

    return (
        <div>
            <h2>Character: {character.name}</h2>
            <button onClick={handleSave}>Save</button>
            {rooms[character.room]}
        </div>
    )
}