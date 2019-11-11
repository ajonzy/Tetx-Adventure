import React, { useState, useEffect, useRef } from 'react'

export default function home(props) {
    const [player, updatePlayer] = useState()
    const [characters, updateCharacters] = useState()
    const [save, updateSave] = useState()

    const [newCharacterName, updateNewCharacterName] = useState("")
    const [emptyName, updateEmptyName] = useState(true)
    const [emptynameError, updateEmptyNameError] = useState(false)

    const componentMounted = useRef(false)
    
    useEffect(() => {
        if (!componentMounted.current) {
            updatePlayer(props.user)
            updateSave(props.user.save)

            fetch(`http://127.0.0.1:5000/users/${props.user.username}/characters/get_all`, {
                method: "GET"
            })
            .then(response => response.json())
            .then(data => {
                updateCharacters(data)
            })

            componentMounted.current = true
        }
    })

    const handleChange = () => {
        updateEmptyName(false)
        updateEmptyNameError(false)
        updateNewCharacterName(event.target.value)
    }

    const displayCharacters = (characters) => {
        const characterList = []
        for (const character of characters) {
            characterList.push(
                <h5 key={character.id} onClick={() => props.callback(character)}>{character.name}</h5>
            )
        }
        return characterList
    }

    const createNewCharacter = () => {
        if (emptyName) {
            updateEmptyNameError(true)
        } else {
            fetch("http://127.0.0.1:5000/characters/add", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "user": player.id,
                    "name": newCharacterName
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data == "Added character") {
                    fetch(`http://127.0.0.1:5000/users/${player.username}/characters/get_all`, {
                        method: "GET"
                    })
                    .then(response => response.json())
                    .then(data => {
                        updateCharacters(data)
                        props.callback(data[data.length - 1])
                    })
                }
            })
        }
    }

    return (
        player ?
        <div className="home centered-column">
            <h2>Welcome {player.username}!</h2>
            <h4>Select your character:</h4>

            {characters ? displayCharacters(characters) : null}

            <input type="text" value={newCharacterName} onChange={handleChange} placeholder="Name"/>
            <button onClick={createNewCharacter}>New Character</button>
            <p style={{visibility: emptynameError ? "visible" : "hidden"}}>Name can not be empty... Please enter a name</p>

            {Object.entries(save).length != 0 ?
            <div className="centered-column">
                <h4>Or reload last save</h4>
                <button onClick={() => props.callback(player.save)}>Load</button>
            </div>
            : null}
        </div>
        :
        <div></div>
    )
}