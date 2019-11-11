import React from 'react'

export default function roomZero(props) {
    return (
        props.character.items["Rusty Key"] ?
        <div className="centered-column">
            <p>You find yourself in a dungeon. To the left is door. To the right is a dark hallway.</p>
            <hr/>
            <button onClick={() => props.roomFunctions.updateRoom(1)}>Open the door</button>
            <button onClick={() => props.roomFunctions.updateRoom(2)}>Investigate dark hallway</button>
        </div>
        :
        <div className="centered-column">
            <p>You find yourself in a dungeon. To the left is door. To the right is a dark hallway. You're not sure, but you think you hear growling...</p>
            <hr/>
            <button onClick={() => props.roomFunctions.updateRoom(1)}>Open the door</button>
            <button onClick={() => props.roomFunctions.updateRoom(2)}>Investigate dark hallway</button>
        </div>
    )
}