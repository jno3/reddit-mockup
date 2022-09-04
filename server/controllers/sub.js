import Sub from "../models/Sub.js";
import Thread from "../models/Thread.js";
import User from "../models/User.js";

const createSub = async(req, res) => {
    try {
        const {name, username} = req.body;
        const user = await User.findOne({username: username});
        const data = {name: name, creator: user._id, member: user._id}
        const response = await Sub.create(data);
        await user.updateOne({ $push: {sub: response}});
        return res.status(201).json({ data: name, success: true });
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const getAllThreadsSub = async (req, res) => {
    try{
        const {name} = req.params;
        const {thread} = await Sub.findOne({name: name});
        const response = await Thread.find({
            '_id': {
                $in: thread
            }
        })
        return res.status(201).json({ data: response, success: true });
    }
    catch(err){
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const getUserSubs= async (req, res) => {
    try{
        const {username} = req.params;
        const {sub} = await User.findOne({username: username});
        const subs = await Sub.find({
            "_id":{
                $in: sub
            }
        });
        const response = subs.map((item) => {
            return item.name;
        })
        return res.status(200).json({ data: response, success: true });
    }
    catch(err){
        console.log(err)
    }
    return res.status(400).json({ success: false });
}

const getAllSubs = async (req, res) => {
    try{
        const response = await Sub.find();
        console.log(response);
    }
    catch(err){
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

export {createSub, getAllThreadsSub, getAllSubs, getUserSubs};