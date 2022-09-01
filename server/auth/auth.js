import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ success: false, type: 'notoken' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        req.user = decoded;
        // console.log(req.user);
        next();
    }
    catch (err) {
        res.clearCookie('token');
        return res.status(401).json({ success: false, type: 'token' })
    }
}



export { auth };