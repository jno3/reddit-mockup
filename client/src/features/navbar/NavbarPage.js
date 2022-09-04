import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../globalvar";
import { authUser, tokenLogout } from "../auth/authUser";


export function NavbarPage() {

    const [subs, setSubs] = useState([]);

    const logoutFunction = async () => {
        try {
            await axios.get(`${API_URL}/user/logout`).then(
                localStorage.removeItem('user')
            ).catch((err) => {
                console.log(err);
            });
            alert('logged out successfully');
            // document.location.href = "/";
        }
        catch (err) {
            console.log(err);
        }

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
            const response = await axios.get(`${API_URL}/sub/getsubs/${JSON.parse(localStorage.getItem('user')).data}`)
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
        <nav>
            <ul className="nav-list">
                <li>
                    <Link to="/">
                        <button>
                            Home
                        </button>
                    </Link>
                </li>
                <li className="register">
                    <Link to="/register">
                        <button>
                            Register
                        </button>
                    </Link>
                </li>
                <li className="login">
                    <Link to="/login">
                        <button>
                            Login
                        </button>
                    </Link>
                </li>
                <li className="logout">
                    <button onClick={logoutFunction}>Logout</button>
                </li>
                <li className="subs">
                    <button onClick={dropdownVisibility}>
                        My Subreddits
                    </button>
                    <div className="dropdown" style={{ display: 'none' }}>
                        {subs.map((item, i) => {
                            return (
                                <div key={i}>
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