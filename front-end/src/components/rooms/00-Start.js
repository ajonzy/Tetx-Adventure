import React from 'react'

export default function roomZero(props) {
    return (
        <div>
            <p>You find yourself in a dungeon. To the left is door. To the right is a dark hallway. You're not sure, but you think you hear growling...</p>
            <hr/>
            <button onClick={() => props.updateRoom(1)}>Open the door</button>
            <button onClick={() => props.updateRoom(2)}>Investigate dark hallway</button>
        </div>
    )
}