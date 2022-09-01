import { Router } from "express";
import { loginUser, registerUser, auth } from "../controllers/user.js";
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').get(auth).post(loginUser);



export default router;