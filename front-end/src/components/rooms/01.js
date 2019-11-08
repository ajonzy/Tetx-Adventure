import React from 'react'

export default function roomOne(props) {
    return (
        props.character.items["Rusty Key"] ?
            props.character.items["Rusty Dagger"] ?
            <div>
                <p>You use your rusty key to open the door, and you step through into a long hallway. Behind you is a door.</p>
                <hr/>
                <button onClick={() => props.roomFunctions.updateRoom(3)}>Walk further down the hallway</button>
                <button onClick={() => props.roomFunctions.updateRoom(0)}>Go through the door</button>
            </div>
            :
            <div>
                <p>You use your rusty key to open the door, and you step through into a long hallway. Behind you is a door. On the floor in front of you is a rusty looking dagger...</p>
                <hr/>
                <button onClick={() => props.roomFunctions.updateRoom(3)}>Walk further down the hallway</button>
                <button onClick={() => props.roomFunctions.updateRoom(0)}>Go through the door</button>
                <button onClick={() => props.roomFunctions.handleItemFind("Rusty Dagger")}>Pick up the dagger</button>
            </div>
        :
        <div>
            <p>You try to open the door, but it is locked...</p>
            <hr/>
            <button onClick={() => props.roomFunctions.updateRoom(0)}>Darn :(</button>
        </div>
    )
}