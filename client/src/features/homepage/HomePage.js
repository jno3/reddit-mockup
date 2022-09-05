import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export function HomePage() {

    var user;
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user')).data;
    }

    useEffect(() => {
        if (user) {
            document.querySelector('.profile-btn').style.display = 'inline';
            document.querySelector('.personal-btn').style.display = 'inline';
        }
    }, [user]);
    return (
        <div>
            CONTENT
            {<div key={user}>{user}</div>}
            <Link to='create'>
                <button>CREATE NEW SUB</button>
            </Link>
            <Link to={`/u/${user}`} /*className="profile-btn"*/>
                <button className="profile-btn" style={{ display: 'none' }}>
                    {user}
                </button>
            </Link>
            <br />
            <button className="personal-btn" style={{ display: 'none' }}>
                HOME
            </button>
            <button>
                ALL
            </button>
            <br />
        </div>
    )
}