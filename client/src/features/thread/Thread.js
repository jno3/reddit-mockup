import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tokenLogout } from "../auth/authUser";
// import { useSelector, useDispatch } from "react-redux";
// import { addThreadAsync, showThreads, initializeState } from "./threadSlice";
const API_URL = "http://localhost:5000/thread";


export function Thread() {
    const { name } = useParams();

    const [newThread, setNewThread] = useState({
        title: '',
        body: ''
    });


    const addNewThread = async () => {
        try {
            const payload = {
                title: newThread.title,
                body: newThread.body,
                username: JSON.parse(localStorage.getItem('user')).data,
                subname: name
            };
            await axios.post(API_URL, payload);
        }
        catch (err) {
            try{
                tokenLogout(err);
            }
            catch(err){
                alert('you must log in first')
            }
        }
    }

    return (
        <div>
            <h1>Thread Form</h1>
            <input
                onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
            />
            <br />
            <textarea
                onChange={(e) => setNewThread({ ...newThread, body: e.target.value })}
            />
            <br />
            <button onClick={addNewThread}>Submit</button>
        </div>
    )
}