import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { authUser, tokenLogout } from '../auth/authUser';
import './Sub.css'
import API_URL from "../../globalvar";

export function SubFeature() {

    const [threads, setThreads] = useState([]);

    const [logged, setLogged] = useState({
        loggedin: false,
        subbed: false
    });

    const { subname } = useParams()

    var username = '';
    if(JSON.parse(localStorage.getItem('user'))){
        username = JSON.parse(localStorage.getItem('user')).data;
    }

    useEffect(() => {
        const getSubContent = async () => {
            const response = await axios.get(`${API_URL}/sub/${subname}`);
            const data = response.data.data;
            setThreads(data);
        }
        getSubContent();

        authUser().then(async (response) => {
            const btn = document.getElementById('joinbutton')
            if (response.success) {
                setLogged({ ...logged, loggedin: true })
                await axios.get(`${API_URL}/user/checksub/${username}/${subname}`)
                    .then((response) => {
                        if (response.data.data) {
                            setLogged({ loggedin: true, subbed: response.data.data });
                            document.getElementById('joinbutton')
                                .textContent = 'LEAVE SUB'
                        } else {
                            document.getElementById('joinbutton')
                                .textContent = 'JOIN SUB';
                        }
                    })
            } else {
                btn.style.display = 'none';
            }
        })

    }, [subname]);

    const joinSub = async () => {
        if (logged.loggedin) {
            await axios.post(`${API_URL}/user/join`, { username: username, subname: subname, join: !logged.subbed })
            .then(() => {
                window.location.reload();
            })
        }
    }

    return (
        <div className="sub-page-container">
            <div className="sub-nav">
                <div className="sub-title">
                    <h1>
                        {subname}
                    </h1>
                </div>
                <div className="sub-page-buttons">
                    <Link to={`/r/${subname}/newthread`}>
                        <button id="createbutton">CREATE THREAD</button>
                    </Link>
                    <button id="joinbutton" onClick={joinSub}>

                    </button>
                </div>
            </div>
            {
                threads.map((item) => {
                    return (
                        <div key={item._id} className="single-comp">
                            <Link to={`/r/${subname}/${item._id}`}>
                                {item.title}
                            </Link><br /> by <Link to={`/u/${item.creator_username}`}>
                                {item.creator_username}
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}