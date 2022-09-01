import React from "react";
import { useSelector } from "react-redux";
import { showUser } from "../user/userLoginSlice";
import authUser from "../auth/authUser";

export function HomePage() {

    const user = useSelector(showUser);

    return (
        <div>
            CONTENT
            {<div key={user}>{user}</div>}
            <button onClick={authUser}>CREATE THREAD</button>
        </div>
    )
}