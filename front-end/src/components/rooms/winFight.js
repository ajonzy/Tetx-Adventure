import React from 'react'

export default function winFight(props) {
    const renderItemsGained = () => {
        const items = []
        props.itemsGained.forEach(item => {
            items.push(
                <div key={item} className="item-gained">
                    - {item}
                </div>
            )
        })

        return items
    }

    return (
        <div className="win-fight">
            <p>You Won!!</p>
            <p>You gained the following items:</p>
            {renderItemsGained()}
            <p>You now have {props.character.current_hitpoints} hitpoints!</p>
            <hr/>
            <button onClick={() => props.roomFunctions.updateRoom(props.previousRoom)}>Excellent!</button>
        </div>
    )
}