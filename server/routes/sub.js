import express from 'express';
import { createSub, getAllThreadsSub } from '../controllers/sub.js';
import { auth } from '../auth/auth.js'
const router = express.Router();

router.route('/create').post(createSub);
router.route('/:name').get(getAllThreadsSub);


export default router;