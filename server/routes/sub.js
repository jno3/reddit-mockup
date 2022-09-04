import express from 'express';
import { createSub, getAllThreadsSub, getUserSubs } from '../controllers/sub.js';
import { auth } from '../auth/auth.js'
const router = express.Router();

router.route('/create').post(createSub);
router.route('/:name').get(getAllThreadsSub);
router.route('/getsubs/:username').get(getUserSubs);

export default router;