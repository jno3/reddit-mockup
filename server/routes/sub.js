import express from 'express';
import { createSub } from '../controllers/sub.js';
import { auth } from '../auth/auth.js'
const router = express.Router();

router.route('/create').post(auth, createSub);

export default router;