import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import API_URL from "../../globalvar";
import './Forms.css';

export function UserRegisterPage() {
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        confirm: '',
    });

    const registerUser = async () => {
        try {
            await axios.post(`${API_URL}/user/register`, newUser);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="user-page">
            <div className="user-form">
                <div className="user-input">
                    <input
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="Username"/>
                    <br />
                    <input
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Password" type="password"/>
                    <br />
                    <input
                        onChange={(e) => setNewUser({ ...newUser, confirm: e.target.value })}
                    placeholder="Confirm Password" type="password"/>
                </div>
                <div className="container-btn">
                    <button onClick={registerUser}>Register</button>
                    <Link to='/'>
                        <button>Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}