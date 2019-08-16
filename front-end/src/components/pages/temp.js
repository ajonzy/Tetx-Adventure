import React, {useState, useEffect} from 'react'

import Home from "./home"

export default function() {
    const [user, updateUser] = useState()

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/users/get/ajonzy`, {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            updateUser(data)
        })
    })

    return (
        <div>
            {user ? <Home user={user} /> : null}
        </div>
    )
}