import React from "react";
import './Component.css';

export function AllComponent(data, user) {
    return (
        <div key={'home'}>
            {data.map((item) => {
                if (user) {
                    if (user !== item.creator_username) {
                        return (
                            <div className="single-item" key={item._id}>
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
                                {item.body}
                            </div>
                        )
                    }
                }
                else {
                    return (
                        <div className="single-item" key={item._id}>
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
                            {item.body}
                        </div>
                    )
                }
            })}
        </div>
    )
}
