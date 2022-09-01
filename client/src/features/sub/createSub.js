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
            await axios.post(API_URL, newSub);
        }
        catch (err) {
            tokenLogout(err);
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