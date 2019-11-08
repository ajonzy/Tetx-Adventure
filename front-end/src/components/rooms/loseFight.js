import React from 'react'

export default function loseFight(props) {
    return (
        <div className="lose-fight">
            <p>You Lost!!</p>
            <p>You are dead :(</p>
            <p>Restart from last save?</p>
            <hr/>
            <button onClick={() => props.roomFunctions.updateCharacter(props.savedCharacter)}>Yes</button>
        </div>
    )
}