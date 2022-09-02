import Sub from "../models/Sub.js";
import User from "../models/User.js";

const createSub = async(req, res) => {
    try {
        const {name, username} = req.body;
        const user = await Sub.findOne({username: username}); 
        const data = {name: name, creator: user._id, member: user._id}
        const response = await Sub.create(data);
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
        const response = await Sub.findOne({name: name});
        console.log(response)
    }
    catch(err){
        console.log(err);
    }
    res.send('aa');
}

export {createSub, getAllThreadsSub};