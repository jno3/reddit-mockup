import Thread from "../models/Thread.js";
import User from "../models/User.js";
import Sub from "../models/Sub.js";
import Comment from "../models/Comment.js";


const addComment = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ username: data.username });
        const thread = await Thread.findOne({ _id: data.thread });
        const response = await Comment.create({ body: data.body, creator: user._id, thread: thread._id });
        await thread.updateOne({ $push: { comment: response } })
        return res.status(201).json({ data: data, success: true });
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
            }
        })
        const response2 = response.map((item) => {
            return item.creator;
        })
        console.log(response2)
        return res.status(201).json({ data: response, success: true });
    }
    catch (err) {

    }
    res.send('aaa');
}

export { addComment, getComments };