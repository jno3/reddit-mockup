import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../globalvar";

export function UserLoginPage() {

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    // const loginUser = () => {
    //     dispatch(setUserAsync(newUser));
    // }
    
    const loginUser = async() => {
        try {
            const response = await axios.post(`${API_URL}/user/login`, user);
            localStorage.setItem('user', JSON.stringify({...response.data}));
            document.location.href="/";
        } catch (err) {
            const err_msg = document.querySelector('.login-err-message');
            err_msg.textContent = 'wrong credentials'
            setTimeout(() => {
                err_msg.textContent = '';
            }, 2000);
        }
        
    }

    return (
        <div>
            Email
            <input
                onChange={(e) => setUser({...user, username: e.target.value})}
            />
            <br />
            Password
            <input
                onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <br />
            <button onClick={loginUser}>Confirm</button>
            <Link to='/'>
                <button>Back</button>
            </Link>
            <div className="login-err-message">

            </div>
        </div>
    )
}