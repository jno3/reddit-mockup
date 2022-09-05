import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

// import { CommentComponent } from "./CommentComponent";
import { ThreadComponent } from "./ThreadComponent";
import { CommentComponent } from "./CommentComponent";

import { authUser, tokenLogout } from "../auth/authUser";
import API_URL from "../../globalvar";



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
    }, [username]);

    const showThreads = () => {
        document.querySelector('.threads').style.display = 'block';
        document.querySelector('.comments').style.display = 'none';
    }

    const showComments = () => {
        document.querySelector('.threads').style.display = 'none';
        document.querySelector('.comments').style.display = 'block';
    }

    return (
        <div>
            <h1>{username}'s profile</h1>
            <button onClick={showThreads}>
                Threads
            </button>
            <button onClick={showComments}>
                Comments
            </button>
            <div className="threads" style={{display: 'block'}}>
                {data.loaded ? (
                    ThreadComponent(data.logged, data.threads)
                ): (
                    ''
                )}
            </div>
            <div className="comments" style={{display: 'none'}}>
                {data.loaded ? (
                    CommentComponent(data.logged, data.comments)
                ): (
                    ''
                )}
            </div>
        </div>
    );
}