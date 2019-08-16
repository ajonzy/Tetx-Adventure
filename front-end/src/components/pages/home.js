import React, { useState, useEffect, useRef } from 'react'

export default function home(props) {
    const [player, updatePlayer] = useState()
    const [characters, updateCharacters] = useState()
    const [save, updateSave] = useState()

    const [newCharacterName, updateNewCharacterName] = useState("")

    const componentMounted = useRef(false)
    
    useEffect(() => {
        if (!componentMounted.current) {
            updatePlayer(props.user)
            updateSave(props.user[3])

            fetch(`http://127.0.0.1:5000/users/${props.user[1]}/characters/get_all`, {
                method: "GET"
            })
            .then(response => response.json())
            .then(data => {
                updateCharacters(data)
            })

            componentMounted.current = true
        }
    })

    const displayCharacters = (characters) => {
        const characterList = []
        for (const character of characters) {
            characterList.push(
                <h5 key={character[0]}>{character[2]}</h5>
            )
        }
        return characterList
    }

    const createNewCharacter = () => {
        fetch("http://127.0.0.1:5000/characters/add", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "user": player[0],
                "name": newCharacterName
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data == "Added character") {
                fetch(`http://127.0.0.1:5000/users/${player[1]}/characters/get_all`, {
                    method: "GET"
                })
                .then(response => response.json())
                .then(data => {
                    updateCharacters(data)
                })
            }
        })
    }

    return (
        player ?
        <div className="home">
            <h2>Welcome {player[1]}!</h2>
            <h4>Select your character:</h4>

            {characters ? displayCharacters(characters) : null}

            <input type="text" value={newCharacterName} onChange={() => updateNewCharacterName(event.target.value)} placeholder="Name"/>
            <button onClick={createNewCharacter}>New Character</button>

            {save != {} ?
            <div>
                <h4>Or reload last save</h4>
                <button>Load</button>
            </div>
            : null}
        </div>
        :
        <div></div>
    )
}