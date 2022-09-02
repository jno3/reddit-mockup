import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
const API_URL = 'http://localhost:5000/sub';

export function SubFeature() {

    const [threads, setThreads] = useState([]);


    const { name } = useParams()
    // const getSubContent = async () => {
    //     const response = await axios.get(`${API_URL}/${name}`);
    //     const data = response.data.data;
    //     setThreads(data);
    // }

    useEffect(() => {
        const getSubContent = async () => {
            const response = await axios.get(`${API_URL}/${name}`);
            const data = response.data.data;
            setThreads(data);
        }
        getSubContent();
    }, [name]);

    return (
        <div>
            <br />
            <Link to={`/r/${name}/newthread`}>
                <button>CREATE THREAD</button>
            </Link>
            {
                threads.map((item) => {
                    return (
                        <div key={item._id}>{item.title}</div>
                    )
                })
            }
        </div>
    )
}