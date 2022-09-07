import { Router } from "express";
import { addThread, getThread, getAllThreads } from "../controllers/thread.js"
const router = Router();

router.route('/').post(addThread);
router.route('/all').get(getAllThreads);
router.route('/:threadid').get(getThread);

export default router;