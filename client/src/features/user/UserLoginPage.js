import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../globalvar";
import './Forms.css';

export function UserLoginPage() {

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    // const loginUser = () => {
    //     dispatch(setUserAsync(newUser));
    // }

    const loginUser = async () => {
        try {
            const response = await axios.post(`${API_URL}/user/login`, user);
            localStorage.setItem('user', JSON.stringify({ ...response.data }));
            document.location.href = "/";
        } catch (err) {
            const err_msg = document.querySelector('.login-err-message');
            err_msg.textContent = 'wrong credentials'
            setTimeout(() => {
                err_msg.textContent = '';
            }, 2000);
        }

    }

    return (
        <div className="user-page">
            <div className="user-form">
                <div className="user-input">
                    <input
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"/>
                    <br />
                    <input
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password" type="password"/>
                </div>
                <div className="container-btn">
                    <button onClick={loginUser} className="user-btn">Log In</button>
                    <Link to='/'>
                        <button className="user-btn">Back</button>
                    </Link>
                </div>
                <div className="login-err-message">

                </div>
            </div>
        </div>
    )
}