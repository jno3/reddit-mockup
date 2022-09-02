// import bcrypt from 'bcrypt';
import User from "../models/User.js";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const registerUser = async (req, res) => {
    const { username, password, confirm } = req.body;
    try {
        const userVal = await User.findOne({ 'username': username });
        if (userVal) {
            return res.status(409).json({ success: false });
        }
        // if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(password)) {
        //     req.body.password = await bcrypt.hash(password, 10);
        // } else {
        //     return res.status(409).json({ success: false });
        // }
        const user = await User.create(req.body);
        return res.status(201).json({ success: true });
    }
    catch (err) {
        return res.status(500).json({ success: false })
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ 'username': username });
        if (!user) {
            return res.status(409).json({ success: false });
        }
        if (user.password === password) {
            passport.serializeUser((user, done) => {
                done(null, user);
            });
            passport.deserializeUser((user, done) => {
                done(null, user);
            });
            req.login(user, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({ success: false });
                }

                /*
                const {_id, username} = req.user
                const token = jwt.sign({_id: payload}, process.env.SESSION_SECRET, {
                    expiresIn: 604800
                });
                res.cookie('token', token, {httpOnly: true});
                return res.status(201).json({ data: req.user._id, success: true });
                */
            })
            const { _id, username } = req.user

            const token = jwt.sign(
                { _id: _id, username: username },
                process.env.SESSION_SECRET,
                { expiresIn: '1h' });

            return res.status(200).cookie('token', token, { httpOnly: true }).json({data: username, success: true});

            // return res.status(200).json({ username: username, token: token, success: true });
        } else {
            return res.status(409).json({ success: false });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false });
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ success: true });
}

export { registerUser, loginUser, logoutUser }