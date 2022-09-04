import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
const API_URL = 'http://localhost:5000/sub';

export function SubFeature() {

    const [threads, setThreads] = useState([]);


    const { subname } = useParams()
    // const getSubContent = async () => {
    //     const response = await axios.get(`${API_URL}/${name}`);
    //     const data = response.data.data;
    //     setThreads(data);
    // }

    useEffect(() => {
        const getSubContent = async () => {
            const response = await axios.get(`${API_URL}/${subname}`);
            const data = response.data.data;
            console.log(data)
            setThreads(data);
        }
        getSubContent();
    }, [subname]);

    return (
        <div>
            <br />
            <Link to={`/r/${subname}/newthread`}>
                <button>CREATE THREAD</button>
            </Link>
            {
                threads.map((item) => {
                    return (
                        <div key={item._id}>
                            {item.creator_username} | <Link to={`/r/${subname}/${item._id}`}>
                                {item.title}
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}