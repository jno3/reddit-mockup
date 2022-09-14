import { Router } from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    getUserSubs,
    getUserThreadsAndComments, 
    getUserHome,
    checkSub,
    joinSub
} from "../controllers/user.js";

import { auth } from '../auth/auth.js'
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/home/:username').get(getUserHome);
router.route('/getsubs/:username').get(getUserSubs);
router.route('/profile/:username').get(getUserThreadsAndComments);
router.route('/checksub/:username/:subname').get(checkSub);
router.route('/join').post(joinSub)
router.route('/auth').all(auth);

export default router;