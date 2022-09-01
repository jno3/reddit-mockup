import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUserAsync } from "./userLoginSlice";


export function UserLogin() {
    const dispatch = useDispatch();

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
    });

    const loginUser = () => {
        dispatch(setUserAsync(newUser));
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
            <button onClick={loginUser}>Confirm</button>
            <Link to='/'>
                <button>Back</button>
            </Link>
        </div>
    )
}