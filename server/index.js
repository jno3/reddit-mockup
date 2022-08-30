import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import threadRouter from './routes/thread.js'
dotenv.config()

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/thread', threadRouter);



await mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(5000, () => {
        console.log(`app is listening on port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(err);
})
