import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addThreadAsync, showThreads, initializeState } from "./threadSlice";

export function Thread() {
    // const threads = useSelector(showThreads);


    const dispatch = useDispatch();

    const [newThread, setNewThread] = useState({
        title: '',
        body: ''
    });

    const addNewThread = () => {
        dispatch(addThreadAsync(newThread));
    }

    const threads = useSelector(showThreads);
    useEffect(() => {
        dispatch(initializeState());
    }, []);

    return (
        <div>
            <h1>Thread Form</h1>
            <input
                onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
            />
            <br />
            <textarea
                onChange={(e) => setNewThread({ ...newThread, body: e.target.value })}
            />
            <button onClick={addNewThread}>Submit</button>
            {threads.map((thread) => {
                return (
                    <div key={thread._id}>
                        <p key={`${thread._id}-ttl`}>{thread.title}</p>
                        <p key={`${thread._id}-bdy`}>{thread.body}</p>
                    </div>
                );
            })}
        </div>
    )
}