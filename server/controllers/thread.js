import Thread from "../models/Thread.js";
import User from "../models/User.js"
import Sub from "../models/Sub.js"


const addThread = async (req, res) => {
    try {
        const data = req.body;
        const { username, subname } = data;
        const user = await User.findOne({ username: username });
        const sub = await Sub.findOne({ name: subname });
        const payload = { title: data.title, body: data.body, creator: user._id, sub: sub._id };
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
        const {threadid} = req.params;
        const thread = await Thread.findOne({_id: threadid});
        const user = await User.findOne({_id: thread.creator});
        const response = {title: thread.title, body: thread.body, creator: user.username}
        return res.status(201).json({ data: response, success: true });
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

export { addThread, getThread };