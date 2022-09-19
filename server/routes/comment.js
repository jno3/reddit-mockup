import express from 'express';
import { addComment, addSubComment, getComments, deleteComment, updateComment } from '../controllers/comment.js';

const router = express.Router();

router.route('/').post(addComment);
router.route('/reply').post(addSubComment);
router.route('/:threadid').get(getComments);
router.route('/del/:commid').get(deleteComment);
router.route('/update').post(updateComment);

export default router;