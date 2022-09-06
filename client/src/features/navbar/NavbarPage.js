import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../globalvar";
import { authUser, tokenLogout } from "../auth/authUser";
import './NavbarPage.css';


export function NavbarPage() {

    const [subs, setSubs] = useState([]);

    const logoutFunction = async () => {
        authUser().then(async (response) => {
            const r = await tokenLogout(response)
            if (r) {
                console.log(response)
                try {
                    await axios.get(`${API_URL}/user/logout`).then(
                        localStorage.removeItem('user')
                    ).catch((err) => {
                        console.log(err);
                    });
                    alert('logged out successfully');
                    document.location.href = "/";
                }
                catch (err) {
                    console.log(err);
                }
            } else {
                document.location.href = "/";
            }
        })

    }

    const buttonManagement = () => {
        const reg = document.querySelector('.register');
        const lin = document.querySelector('.login');
        const out = document.querySelector('.logout');
        const sbs = document.querySelector('.subs');
        if (localStorage.getItem('user')) {
            reg.style.display = 'none';
            lin.style.display = 'none';

        } else {
            sbs.style.display = 'none';
            out.style.display = 'none';
        }
    }

    const getSubs = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/getsubs/${JSON.parse(localStorage.getItem('user')).data}`)
            const data = (response.data.data);
            setSubs(data);
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        const logged = tokenLogout(authUser())
        if (localStorage.getItem('user') && logged) {
            getSubs();
        }
        buttonManagement()
    }, [])

    const dropdownVisibility = () => {
        const ddn = document.querySelector('.dropdown');
        if (ddn.style.display === 'none') {
            ddn.style.display = 'block';
        } else {
            ddn.style.display = 'none';
        }
    }


    return (
        <nav className="nav-bar">
            <ul className="nav-list">
                <li>
                    <Link to="/">
                        <button className="nav-btn">
                            Home
                        </button>
                    </Link>
                </li>
                <li className="register">
                    <Link to="/register">
                        <button className="nav-btn">
                            Register
                        </button>
                    </Link>
                </li>
                <li className="login">
                    <Link to="/login">
                        <button className="nav-btn leftmost">
                            Login
                        </button>
                    </Link>
                </li>
                <li className="logout">
                    <button onClick={logoutFunction} className="nav-btn">
                        Logout
                    </button>
                </li>
                <li className="subs">
                    <button onClick={dropdownVisibility} className="nav-btn leftmost">
                        My Subreddits
                    </button>
                    <div className="dropdown" style={{ display: 'none' }}>
                        {subs.map((item, i) => {
                            return (
                                <div key={`${item}${i}`} className="ddw-cmp">
                                    <a href={`/r/${item}`}>{item}</a>
                                </div>
                            )
                        })}
                    </div>
                </li>
            </ul>
        </nav>
    );

}