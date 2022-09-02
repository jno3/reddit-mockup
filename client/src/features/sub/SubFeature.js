import React from "react";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";


export function SubFeature() {

    const { name } = useParams()


    return (
        <div>
            CONTENT
            <br />
            <Link to={`/r/${name}/newthread`}>
                <button>CREATE THREAD</button>
            </Link>
        </div>
    )
}