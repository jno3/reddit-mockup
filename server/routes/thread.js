import { Router } from "express";
import { addThread, getThread, getAllThreads, editThread, deleteThread } from "../controllers/thread.js"
const router = Router();

router.route('/').post(addThread);
router.route('/all').get(getAllThreads);
router.route('/:threadid').get(getThread);
router.route('/delete').delete(deleteThread);
router.route('/edit').post(editThread);

export default router;