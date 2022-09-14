import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

// import { CommentComponent } from "./CommentComponent";
import { ThreadComponent } from "./ThreadComponent";
import { CommentComponent } from "./CommentComponent";

import { authUser, tokenLogout } from "../auth/authUser";
import API_URL from "../../globalvar";
import './Profile.css';


export function ProfilePage() {

    const { username } = useParams();

    const [data, setData] = useState(
        {
            comments: [],
            threads: [],
            logged: false,
            loaded: false
        }
    );

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const back = await axios.get(`${API_URL}/user/profile/${username}`)
                const response = back.data.data;
                // console.log(response)
                return response;
            }
            catch (err) {
                document.location.href = "/notfound";
            }
        }
        getProfileData().then((response) => {
            tokenLogout(authUser()).then((logged) => {
                setData({
                    comments: response.comments,
                    threads: response.threads,
                    logged: logged,
                    loaded: true
                });
            });
        });
        document.getElementById('t-btn').click();
    }, [username]);

    const showThreads = () => {
        document.querySelector('.threads').style.display = 'block';
        document.querySelector('.comments').style.display = 'none';
        const t = document.getElementById('t-btn');
        t.classList.add('afterclick');
        const c = document.getElementById('c-btn');
        c.classList.remove('afterclick');
    }

    const showComments = () => {
        document.querySelector('.threads').style.display = 'none';
        document.querySelector('.comments').style.display = 'block';
        const c = document.getElementById('c-btn');
        c.classList.add('afterclick');
        const t = document.getElementById('t-btn');
        t.classList.remove('afterclick');
    }

    return (
        <div className="profile-page">
            <div className="user">
                <h1>{username}'s Profile</h1>
                <button onClick={showThreads} id="t-btn" className="btn">
                    Threads
                </button>
                <button onClick={showComments} id="c-btn" className="btn">
                    Comments
                </button>
            </div>
            <div className="content">
                <div style={{ display: 'block' }} className="threads">
                    {data.loaded ? (
                        ThreadComponent(data.logged, data.threads)
                    ) : (
                        ''
                    )}
                </div>
                <div style={{ display: 'none' }} className="comments">
                    {data.loaded ? (
                        CommentComponent(data.logged, data.comments)
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}