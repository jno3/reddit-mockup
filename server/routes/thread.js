import { Router } from "express";
import { addThread, getThread } from "../controllers/thread.js"
const router = Router();

router.route('/').post(addThread);
router.route('/:threadid').get(getThread);

export default router;