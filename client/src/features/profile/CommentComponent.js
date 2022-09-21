import React from "react";
import './Component.css';


export function CommentComponent(logged, data) {
    return (
        <div key={'comments'}>
            {data.map((item, i) => {
                return (
                    <div key={`comment${i}`} className="profile-comp comm-comp">
                        {item.body}<br/> at <a
                         href={`/r/${item.sub_name}/${item.thread}`}>
                            {item.sub_name}
                        </a>
                    </div>
                )
            })}
        </div>
    )
}
