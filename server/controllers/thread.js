import Thread from "../models/Thread.js";
import User from "../models/User.js"
import Sub from "../models/Sub.js"


const addThread = async (req, res) => {
    try {
        const data = req.body;
        const { username, subname } = data;
        const user = await User.findOne({ username: username });
        const sub = await Sub.findOne({ name: subname });
        const payload = { title: data.title, body: data.body, creator: user._id, creator_username: user.username, sub: sub._id, sub_name: subname };
        const response = await Thread.create(payload);
        await sub.updateOne({ $push: { thread: response } })
        await user.updateOne({ $push: { thread: response } });
        return res.status(201).json({ data: data, success: true });
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const getThread = async (req, res) => {
    try {
        const { threadid } = req.params;
        const thread = await Thread.findOne({ _id: threadid });
        const user = await User.findOne({ _id: thread.creator });
        const response = { id: thread._id, title: thread.title, body: thread.body, creator: user.username }
        return res.status(200).json({ data: response, success: true });
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const getAllThreads = async (req, res) => {
    try {
        const data = await Thread.find({}, '-creator -sub -comment');
        return res.status(201).json({ data: data, success: true });
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const editThread = async (req, res) => {
    try {
        const { id, value } = req.body
        await Thread.updateOne(
            { _id: id },
            {
                $set: {
                    body: value
                }
            }
        )
        return res.status(201).json({ success: true });
    } catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const deleteThread = async (req, res) => {
    try {
        const id = req.body.obj.id;
        await Thread.findOneAndDelete({_id: id});
        return res.status(201).json({ success: true });
    }
    catch (err) {

    }
    return res.status(400).json({ success: false });
}

export { addThread, getThread, getAllThreads, editThread, deleteThread };