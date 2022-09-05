import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'must provide thread body'],
    },
    thread: {type: Schema.Types.ObjectId, ref: 'Thread'},
    parent: {type: Schema.Types.ObjectId, ref: 'Comment'},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    creator_username: String,
    sub_name: String,
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;