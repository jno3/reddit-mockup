import express from 'express';
import { addComment, addSubComment, getComments, deleteComment } from '../controllers/comment.js';

const router = express.Router();

router.route('/').post(addComment);
router.route('/reply').post(addSubComment);
router.route('/:threadid').get(getComments);
router.route('/del/:commid').get(deleteComment);

export default router;