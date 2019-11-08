import React from 'react'

export default function roomOne(props) {
    const guardDog = {
        name: "guard Dog",
        hitpoints: 10,
        attack: 500,
        items: ["Rusty Key", "Health Potion"]
    }

    return (
        props.character.items["Rusty Key"] ?
        <div>
            <p>You find yourself in a dark hallway... There is nothing here but a guard dog cowering in the corner.</p>
            <hr/>
            <button onClick={() => props.roomFunctions.updateRoom(0)}>Leave</button>
        </div>
        :
        <div>
            <p>You walk into the dark hallway to find a vicious looking guard dog! Hanging on his color is a rusty looking key...</p>
            <hr/>
            <button onClick={() => props.roomFunctions.handleFight(guardDog)}>Fight!</button>
            <button onClick={() => props.roomFunctions.updateRoom(0)}>Run away!</button>
        </div>
    )
}