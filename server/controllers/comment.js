import Thread from "../models/Thread.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Sub from "../models/Sub.js";


const addComment = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ username: data.username });
        const thread = await Thread.findOne({ _id: data.thread });
        const { name } = await Sub.findOne({ _id: thread.sub });
        const response = await Comment.create({ body: data.body, creator: user._id, creator_username: user.username, thread: thread._id, sub_name: name });
        await thread.updateOne({ $push: { comment: response } });
        await user.updateOne({ $push: { comment: response } });
        return res.status(201).json({ data: data, success: true });
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const addSubComment = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ username: data.username });
        const thread = await Thread.findOne({ _id: data.thread });
        const parent = await Comment.findOne({ _id: data.parent });
        const { name } = await Sub.findOne({ _id: thread.sub });
        const response = await Comment.create({ body: data.body, creator: user._id, creator_username: user.username, thread: thread._id, sub_name: name });
        await parent.updateOne({ $push: { child: response._id } });
        await thread.updateOne({ $push: { comment: response } });
        await user.updateOne({ $push: { comment: response } });
        return res.status(201).json({ success: true });
        // return res.status(201).send('aaa');
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const getComments = async (req, res) => {
    try {
        const { threadid } = req.params;
        const { comment } = await Thread.findOne({ _id: threadid });
        const response = await Comment.find({
            '_id': {
                $in: comment
            },
        })
        return res.status(201).json({ data: response, success: true });
    }
    catch (err) {

    }
    res.send('aaa');
}

export { addComment, addSubComment, getComments };