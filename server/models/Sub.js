import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubSchema = new mongoose.Schema({
    name: String,
    creator: [{type: Schema.Types.ObjectId, ref: 'User'}],
    member: [{type: Schema.Types.ObjectId, ref: 'User'}],
    thread: [{type: Schema.Types.ObjectId, ref: 'Thread'}]
});

const Sub = mongoose.model('Sub', SubSchema);
export default Sub;