import React from "react";
import './Component.css';

export function HomeComponent(data) {
    return (
        <div key={'home'}>
            {data.map((item) => {
                return (
                    <div className="single-item" key={item._id}>
                        <div className="info">
                            <h2>
                                <a href={`/r/${item.sub_name}/${item._id}`}>
                                    {item.title}
                                </a>
                            </h2>
                            <h3>
                                by <a href={`/u/${item.creator_username}`}>
                                    {item.creator_username}
                                </a> at <a href={`/r/${item.sub_name}`}>{item.sub_name}</a>
                            </h3>
                        </div>
                        {item.body}
                    </div>
                )
            })}
        </div>
    )
}
