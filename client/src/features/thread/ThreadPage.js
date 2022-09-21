import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { tokenLogout } from "../auth/authUser";
import API_URL from "../../globalvar";
import '../user/Forms.css'
// import { useSelector, useDispatch } from "react-redux";
// import { addThreadAsync, showThreads, initializeState } from "./threadSlice";
// const api = "http://localhost:5000/thread";


export function ThreadPage() {
    const { subname } = useParams();

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
                subname: subname
            };
            await axios.post(`${API_URL}/thread`, payload);
            document.location.href = `/r/${subname}`;
        }
        catch (err) {
            try {
                tokenLogout(err);
            }
            catch (err) {
                alert('you must log in first')
            }
        }
    }

    return (
        <div className="user-page">
            <div className="user-form">
                <div className="user-input">
                    <input
                        onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                        placeholder="Thread Title" />
                    <br />
                    <textarea
                        onChange={(e) => setNewThread({ ...newThread, body: e.target.value })}
                        placeholder="Thread Text" />
                </div>
                <div className="container-btn">
                    <button onClick={addNewThread}>Create Thread</button>
                    <Link to={`/r/${subname}/`}>
                        <button>Cancel</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}