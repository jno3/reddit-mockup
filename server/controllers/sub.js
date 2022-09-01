import Sub from "../models/Sub.js";

const createSub = async(req, res) => {
    try {
        const data = req.body;
        const response = await Sub.create(data);
        return res.status(201).json({ data: data, success: true });
    }
    catch (err) {
        console.log(err);
    }
    return res.status(400).json({ success: false });
}

export {createSub};