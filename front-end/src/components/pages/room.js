import React, { useState } from 'react'

import Start from "../rooms/00-Start"
import WinFight from "../rooms/winFight"
import LoseFight from "../rooms/loseFight"
import One from "../rooms/01"
import Two from "../rooms/02"

export default function room(props) {
    const [player] = useState(props.player)
    const [character, updateCharacter] = useState(props.character)
    const [lastSavedCharacter, updateLastSavedCharacter] = useState(props.character)
    const [previousRoom, updatePreviousRoom] = useState(0)
    const [lastItemsGained, updateLastItemsGained] = useState([])

    const updateRoom = (room) => {
        let updatedCharacter = {}
        updatePreviousRoom(character.room)
        Object.assign(updatedCharacter, character)
        updatedCharacter.room = room
        updateCharacter(updatedCharacter)
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
            mob.items.forEach(item => {
                fightResult.items[item] = true
            })
            updateLastItemsGained(mob.items)
            updateCharacter(fightResult)
            updateRoom("winFight")
        } else {
            console.log("You lost!")
            updateCharacter(fightResult)
            updateRoom("loseFight")
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
                updateLastSavedCharacter(character)
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
        winFight: <WinFight character={character} previousRoom={previousRoom} itemsGained={lastItemsGained} roomFunctions={roomFunctions}/>,
        loseFight: <LoseFight character={character} savedCharacter={lastSavedCharacter} roomFunctions={roomFunctions}/>,
        0: <Start character={character} roomFunctions={roomFunctions}/>,
        1: <One character={character} roomFunctions={roomFunctions}/>,
        2: <Two character={character} roomFunctions={roomFunctions}/>,
    }

    return (
        <div>
            <h2>Character: {character.name}</h2>
            {
                character.current_hitpoints > 0 ? <button onClick={handleSave}>Save</button> : null
            }
            {rooms[character.room]}
        </div>
    )
}