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
        const response = await Comment.create({ body: data.body, creator: user._id, creator_username: user.username, parent: parent._id, thread: thread._id, sub_name: name });
        await parent.updateOne({ $push: { child: response._id } });
        // await thread.updateOne({ $push: { comment: response } });
        await user.updateOne({ $push: { comment: response._id } });
        return res.status(201).json({ success: true });
        // return res.status(201).send('aaa');
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const recursiveComments = async (item) => {
    // console.log(item)
    if (item.child) {
        const children = await Comment.find({
            '_id': {
                $in: item.child
            },
        })
        await Promise.all(children.map(async (child) => {
            const chd = JSON.parse(JSON.stringify(child));
            chd.nchild = [];
            // console.log(item)
            // console.log(child)
            item.nchild.push(chd);
            return await recursiveComments(chd);
        }))
    }
    return item;

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

        const data = await Promise.all(response.map(async (item) => {
            var copy = JSON.parse(JSON.stringify(item));
            copy.nchild = [];
            const r = await recursiveComments(copy);
            return r;
        }))
        return res.status(201).json({ data: data, success: true });
    }
    catch (err) {

    }
    return res.status(400).json({ success: false });
}

const deleteComment = async (req, res) => {
    try {
        const { commid } = req.params;
        await Comment.updateOne(
            { _id: commid },
            {
                $set: {
                    body: '[deleted]',
                    creator_username: '[deleted]',
                }
            }
        )
        return res.status(200).json({ success: true });
    } catch (err) {

    }
    return res.status(400).json({ success: false });
}

const updateComment = async (req, res) => {
    try {
        const { id, value } = req.body;
        await Comment.updateOne(
            { _id: id },
            {
                $set: {
                    body: value
                }
            }
        )
        return res.status(201).json({ success: true });
    } catch (err) {

    }
    return res.status(400).json({ success: false });
}

export { addComment, addSubComment, getComments, deleteComment, updateComment };