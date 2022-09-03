import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tokenLogout } from "../auth/authUser";
import API_URL from "../../globalvar";
// import { useSelector, useDispatch } from "react-redux";
// import { addThreadAsync, showThreads, initializeState } from "./threadSlice";


export function ThreadFeature() {
    const { threadid } = useParams();

    const [newComment, setNewComment] = useState({
        body: '',
        // thread: threadid
        parent: '',
        // creator: JSON.parse(localStorage.getItem('user')).data,
    });

    const [comments, setComments]= useState([]);

    const [threadContent, setThreadContent] = useState({
        title: '',
        body: '',
        creator: ''
    });


    useEffect(() => {
        const getThreadContent = async () => {
            const response = await axios.get(`${API_URL}/thread/${threadid}`);
            const data = response.data.data;
            setThreadContent({ title: data.title, body: data.body, creator: data.creator });
        }
        getThreadContent();

        const getCommentsContent = async () => {
            const response = await axios.get(`${API_URL}/com/${threadid}`);
            const data = response.data.data;
            setComments(data);
        }
        getCommentsContent();
    }, [threadid]);

    const addNewComment = async () => {
        try {
            const payload = {
                body: newComment.body,
                thread: threadid,
                parent: newComment.parent, 
                username: JSON.parse(localStorage.getItem('user')).data,
            };
            await axios.post(`${API_URL}/com/`, payload);
        }
        catch (err) {
            try {
                tokenLogout(err);
            }
            catch (err) {
                alert('you must log in first')
            }
        }
    }

    return (
        <div>
            <h2>
                {threadContent.title}
            </h2>
            <p>
                {threadContent.creator}
            </p>
            <p>
                {threadContent.body}
            </p>

            <textarea onChange={(e) => setNewComment({ ...newComment, body: e.target.value })} />
            <br />
            <button onClick={addNewComment}>Submit</button>

            <div>
                {
                    comments.map((item)=>{
                        return (
                            <div key={item._id}>
                                {item.body}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}