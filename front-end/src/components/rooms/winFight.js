import React from 'react'

export default function winFight(props) {
    return (
        <div className="win-fight">
            <p>You Won!!</p>
            <hr/>
            <button onClick={() => props.roomFunctions.updateRoom(props.previousRoom)}>Excellent!</button>
        </div>
    )
}