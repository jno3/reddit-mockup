import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
    const method = req.method;
    const token = req.cookies.token
    if (!token) {
        if (method === 'GET') {
            return res.status(401).json({ success: false, type: 'timeout' });
        }
        return res.status(401).json({ success: false, type: 'notoken' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        req.user = decoded;
        if (method === 'GET') {
            return res.status(200).json({ success: true, type: 'OK' })
        }
        // console.log(req.user);
        next();
    }
    catch (err) {
        res.clearCookie('token');
        return res.status(401).json({ success: false, type: 'token' })
    }
}



export { auth };