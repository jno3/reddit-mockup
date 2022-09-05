import React from "react";

export function ThreadComponent(logged, data) {

    return (
        <div key={'threads'}>
            {data.map((item, i) => {
                return (
                    <div key={`thread${i}`}>
                        <a href={`/r/${item.sub}/${item.id}`}>
                            {item.title}
                        
                        </a> at <a
                         href={`/r/${item.sub}`}>
                            {item.sub}
                        </a>
                    </div>
                )
            })}
        </div>
    )
}
