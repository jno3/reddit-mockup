import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sub: [{type: Schema.Types.ObjectId, ref: 'Sub'}],
    thread: [{type: Schema.Types.ObjectId, ref: 'Thread'}],
    
})

const User = mongoose.model('User', UserSchema)
export default User;