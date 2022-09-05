import React from "react";

export function CommentComponent(logged, data) {

    return (
        <div key={'comments'}>
            {data.map((item, i) => {
                return (
                    <div key={`comment${i}`}>
                        {item.body} at <a
                         href={`/r/${item.sub_name}/${item.thread}`}>
                            {item.sub_name}
                        </a>
                    </div>
                )
            })}
        </div>
    )
}
