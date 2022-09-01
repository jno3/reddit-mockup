import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
// import LocalStrategy from 'passport-local';

import threadRouter from './routes/thread.js';
import userRouter from './routes/user.js';
// import User from './models/User.js';
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.use('/thread', threadRouter);
app.use('/user', userRouter);

await mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(5000, () => {
        console.log(`app is listening on port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(err);
})
