import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ThreadSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'must provide thred title'],
    },
    body: {
        type: String,
        required: [true, 'must provide thread body'],
    },
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    creator_username: String,
    sub:  {type: Schema.Types.ObjectId, ref: 'Sub'},
    sub_name: String,
    comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const Thread = mongoose.model('Thread', ThreadSchema);
export default Thread;