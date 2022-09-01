import Thread from "../models/Thread.js";

const addThread = async (req, res) => {
    try {
        const data = req.body;
        const response = await Thread.create(data);
        return res.status(201).json({ data: response, success: true });
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

const getThread = async (req, res) => {
    try {
        const response = await Thread.find();
        return res.status(201).json({ data: response, success: true });
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

export { addThread, getThread };