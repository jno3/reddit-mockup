import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.js";
import { auth } from '../auth/auth.js'
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/auth').all(auth);

export default router;