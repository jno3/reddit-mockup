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

    const replyFunctionAppearence = (elem, status) => {
        if (logged) {
            document.querySelector(`.${elem} textarea`).value = "";
            if (status === 'do') {
                document.querySelector(`.${elem} .reply-btn`).style.display = 'none';
                document.querySelector(`.${elem} .response-area`).style.display = 'inline';
            } else if (status === 'undo') {
                document.querySelector(`.${elem} .reply-btn`).style.display = 'inline';
                document.querySelector(`.${elem} .response-area`).style.display = 'none';
            }
        } else {
            alert('you must log in first');
        }
    }

    const replyFunction = async (elem, id) => {
        console.log(elem)
        console.log(id)
        if (logged) {
            try {
                const value = document.getElementById(`textearea${elem}`).value;
                console.log(value)
                const payload = {
                    body: value,
                    thread: threadid,
                    parent: id,
                    username: JSON.parse(localStorage.getItem('user')).data,
                };
                await axios.post(`${API_URL}/com/reply`, payload);
            }
            catch (err) {

            }
        }
        else {
            alert('you must log in first');
        }
        replyFunctionAppearence(elem, 'undo');
    }

    const deleteComment = async (id) => {
        try {
            await axios.get(`${API_URL}/com/del/${id}`);
        } catch (err) {

        }
    }

    const Comment = ({ data, curr, par }) => {
        const cname = curr + 'c' + par;
        return data.map((item, index) => {
            return (
                <div key={`component${index}comm`} className={`${cname}${index}` /*`comment-single${index}`*/} style={{ marginLeft: `${(cname.length - 1) * 25}px` }}>
                    {/* {console.log(cname)}
                    {console.log(item.body)} */}

                    {item.body}
                    <br/> {`by `}
                    {item.creator_username === '[deleted]' ? (
                        <p style={{display: 'inline'}}>[deleted]</p>
                    ) : (
                        <a href={`/u/${item.creator_username}`}>{item.creator_username} </a>
                    )}
                    {
                        logged &&
                        <div>
                            <button className={`reply-btn`} onClick={() => replyFunctionAppearence(`${cname}${index}`, 'do')}>
                                Reply
                            </button>
                            <div className={`response-area`} style={{ display: 'none' }}>
                                <textarea id={`textearea${cname}${index}`}
                                    placeholder="Add Your Response" />
                                <br />
                                <button onClick={() => replyFunction(`${cname}${index}`, item._id)}>
                                    Send Reponse
                                </button>
                                <button onClick={() => replyFunctionAppearence(`${cname}${index}`, 'undo')}>
                                    Cancel
                                </button>
                            </div>
                            {
                                JSON.parse(localStorage.getItem('user')).data === item.creator_username &&
                                <>
                                    <button>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteComment(item._id)}>
                                        Delete
                                    </button>
                                </>
                            }
                        </div>
                    }
                    {item.nchild && <Comment data={item.nchild} curr={cname} par={`${index}`} />}
                </div>
            )
        })
    }


    return (
        <div className="thread-container">
            <div className="thread-title">
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
                {comments !== [] && <Comment data={comments} curr={''} par={''} />}
            </div>
        </div>
    )
}