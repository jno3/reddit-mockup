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

    const isAlphaNum = (str) => {
        var code, i, len;
        len = str.length;
        if (len <= 8 || len >= 20) {
            return false;
        }
        for (i = 0; i < len; i++) {
            code = str.charCodeAt(i);
            if (!(code > 47 && code < 58) && // numeric (0-9)
                !(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) { // lower alpha (a-z)
                return false;
            }
        }
        return true
    }

    const registerUser = async () => {
        try {
            if (newUser.password === newUser.confirm) {
                if (isAlphaNum(newUser.username) && isAlphaNum(newUser.password)) {
                    await axios.post(`${API_URL}/user/register`, newUser);
                }else{
                    alert('both password and username must be no shorter than 8, no longer than 20 and have nothing but alphanumeric characters');
                }
            }else{
                alert('passwords don\'t match');
            }
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
                        placeholder="Username" />
                    <br />
                    <input
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        placeholder="Password" type="password" />
                    <br />
                    <input
                        onChange={(e) => setNewUser({ ...newUser, confirm: e.target.value })}
                        placeholder="Confirm Password" type="password" />
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