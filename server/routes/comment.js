import express from 'express';
import { addComment, addSubComment, getComments } from '../controllers/comment.js';

const router = express.Router();

router.route('/').post(addComment);
router.route('/reply').post(addSubComment);
router.route('/:threadid').get(getComments);

export default router;