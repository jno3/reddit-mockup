import express from 'express';
import { addComment, getComments } from '../controllers/comment.js';

const router = express.Router();

router.route('/').post(addComment);
router.route('/:threadid').get(getComments);

export default router;