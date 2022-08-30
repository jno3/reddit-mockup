import mongoose from 'mongoose';

const ThreadSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'must provide thred title'],
    },
    body: {
        type: String,
        required: [true, 'must provide thread body'],
    }
})

const Thread = mongoose.model('Thread', ThreadSchema);
export default Thread;