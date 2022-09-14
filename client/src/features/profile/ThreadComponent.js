import React from "react";
import './Component.css';

export function ThreadComponent(logged, data) {

    return (
        <div key={'threads'}>
            {data.map((item, i) => {
                return (
                    <div key={`thread${i}`} className="profile-comp thread-comp">
                        <a href={`/r/${item.sub}/${item.id}`}>
                            {item.title}
                        
                        </a><br/> at <a
                         href={`/r/${item.sub}`}>
                            {item.sub}
                        </a>
                    </div>
                )
            })}
        </div>
    )
}
