import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
const API_URL = "http://localhost:5000/user/register"


export function UserRegister() {
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        confirm: '',
    });

    const registerUser = async() => {
        try {
            await axios.post(API_URL, newUser);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            Email
            <input
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
            />
            <br />
            Password
            <input
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            />
            <br />
            Confirm Password
            <input
                onChange={(e) => setNewUser({...newUser, confirm: e.target.value})}
            />
            <br />
            <button onClick={registerUser}>Confirm</button>
            <Link to='/'>
                <button>Back</button>
            </Link>
        </div>
    )
}