import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authUser, tokenLogout } from "../auth/authUser";
import API_URL from "../../globalvar";
import './Thread.css';


export function ThreadFeature() {

    const [logged, setLogged] = useState();

    const { threadid } = useParams();

    const [newComment, setNewComment] = useState({
        body: '',
        parent: '',
    });

    const [comments, setComments] = useState([]);

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
        tokenLogout(authUser()).then((response) => {
            setLogged(response);
        })
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

    const ok = () => {
        console.log(logged);
    }

    const replyFunctionAppearence = (i, status) => {
        if (logged) {
            if (status === 'do') {
                document.querySelector(`.reply-btn${i}`).style.display = 'none';
                document.querySelector(`.response-area${i}`).style.display = 'block';
            } else if (status === 'undo') {
                document.querySelector(`.reply-btn${i}`).style.display = 'block';
                document.querySelector(`.response-area${i}`).style.display = 'none';
            }
        } else {
            alert('you must log in first');
        }
    }

    return (
        <div className="thread-container">
            <div className="thread-title">
                <button onClick={ok}>
                    THIS UBTTON
                </button>
                <h2>
                    {threadContent.title}
                </h2>
                <p>
                    by <a href={`/u/${threadContent.creator}`}>{threadContent.creator}</a>
                </p>
            </div>
            <div className="thread-content">
                <p>
                    {threadContent.body}
                </p>
            </div>
            <div className="comment-area">
                <textarea onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
                    placeholder="Add a Comment" />
                <br />
            </div>
            <button onClick={addNewComment}>Submit</button>

            <div>
                {
                    comments.map((item, i) => {
                        return (
                            <div key={item._id} className="comment-single">
                                {item.body}
                                <br />by <a href={`/u/${item.creator_username}`}>{item.creator_username} </a>
                                {
                                    logged &&
                                    <div>
                                        <button className={`reply-btn${i}`} onClick={() => replyFunctionAppearence(i, 'do')}>
                                            Reply
                                        </button>
                                        <div className={`response-area${i}`} style={{ display: 'none' }}>
                                            <textarea placeholder="Add Your Response" />
                                            <br />
                                            <button>
                                                Send Reponse
                                            </button>
                                            <button onClick={() => replyFunctionAppearence(i, 'undo')}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}