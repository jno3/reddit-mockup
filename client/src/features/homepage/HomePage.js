import React from "react";
import { useSelector } from "react-redux";
import { showUser } from "../user/userLoginSlice";
import authUser from "../auth/authUser";
import { Link } from "react-router-dom";

export function HomePage() {

    const user = useSelector(showUser);

    return (
        <div>
            CONTENT
            {<div key={user}>{user}</div>}
            <Link to='create'>
                <button>CREATE NEW SUB</button>
            </Link>
        </div>
    )
}