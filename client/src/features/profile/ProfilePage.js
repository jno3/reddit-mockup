import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { authUser, tokenLogout } from "../auth/authUser";
import API_URL from "../../globalvar";


export function ProfilePage() {

    const { username } = useParams();

    const [data, setData] = useState(
        {
            comments: [],
            threads: [],
            logged: false
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
        tokenLogout(authUser());
        getProfileData().then((response) => {
            tokenLogout(authUser()).then((logged) => {
                setData({
                    comments: response.comments,
                    threads: response.threads,
                    logged: logged
                });
            })
        });
    }, [username]);

    return (
        <div>
            <h1>{username}'s profile</h1>
            <button>
                Posts
            </button>
            <div className="posts-btn">
                {/* {data.threads.map((item) => {
                    return(
                        <a href={`/`}></a>
                    )
                })} */}
            </div>
            <button>
                Comments
            </button>
        </div>
    );
}