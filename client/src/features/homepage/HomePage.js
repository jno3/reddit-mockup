import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './HomePage.css';
import axios from 'axios';
import API_URL from '../../globalvar';

export function HomePage() {

    const [threads, setThreads] = useState({
        all: [],
        all_loaded: false,
        home: [],
        home_loaded: false
    });

    var user;
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user')).data;
    }

    useEffect(() => {
        if (user) {
            document.querySelector('.profile-btn').style.display = 'inline';
            document.querySelector('.personal-btn').style.display = 'inline';
            document.querySelector('.newsub-btn').style.display = 'inline';
        }
        document.querySelector('.all-btn').click();

    }, [user]);

    const getAllData = async () => {
        const response = await axios.get(`${API_URL}/thread/all`);
        return response.data.data;
    }

    const getAll = () => {
        const home = document.querySelector('.personal-btn');
        const all = document.querySelector('.all-btn');
        all.classList.add('afterclick');
        home.classList.remove('afterclick');
        if (!threads.all_loaded) {
            getAllData().then((response) => {
                setThreads({
                    ...threads,
                    all: response,
                    all_loaded: true
                })
            });
        }
    }

    const getHomeData = async () => {
        const response = await axios.get(`${API_URL}/user/home/j`);
        console.log(response.data.data);
        return response.data.data;
    }

    const getHome = () => {
        const home = document.querySelector('.personal-btn');
        const all = document.querySelector('.all-btn');
        all.classList.remove('afterclick');
        home.classList.add('afterclick');
        if(!threads.home_loaded){
            getHomeData().then((response) => {
                setThreads({
                    ...threads,
                    home: response,
                    home_loaded: true
                })
            });
        }
    }


    return (
        <div className="btn-group">
            <button className="personal-btn btn-g1" style={{ display: 'none' }} onClick={getHome}>
                HOME
            </button>
            <button className="all-btn btn-g1" onClick={getAll}>
                ALL
            </button>
            <Link to='create'>
                <button className="newsub-btn btn-g2" style={{ display: 'none' }}>
                    CREATE NEW SUB
                </button>
            </Link>
            <Link to={`/u/${user}`} /*className="profile-btn"*/>
                <button className="profile-btn btn-g2" style={{ display: 'none' }}>
                    {user}
                </button>
            </Link>
            <br />
        </div>
    )
}