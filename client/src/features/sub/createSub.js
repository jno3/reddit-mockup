import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { tokenLogout } from "../auth/authUser";
const API_URL = "http://localhost:5000/sub/create";


export function CreateSubFeature() {

    const [newSub, setNewSub] = useState({
        name: ''
    });

    const createSub = async () => {
        try {
            // console.log(JSON.parse(localStorage.user).data);
            const username = JSON.parse(localStorage.getItem('user')).data;
            const payload = { name: newSub.name, username: username }
            await axios.post(API_URL, payload);
        }
        catch (err) {
            try {
                tokenLogout(err);
            }
            catch (err) {
                alert('you must log in first');
            }
        }
    }

    return (
        <div>
            Subreddit Name
            <br />
            <input
                onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
            />
            <br />
            <button onClick={createSub}>Confirm</button>
            <Link to='/'>
                <button>Back</button>
            </Link>
        </div>
    )
}