import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './HomePage.css';

export function HomePage() {

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
    }, [user]);
    return (
        <div className="btn-group">
            <button className="personal-btn btn-g1" style={{ display: 'none' }}>
                HOME
            </button>
            <button className="all-btn btn-g1">
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