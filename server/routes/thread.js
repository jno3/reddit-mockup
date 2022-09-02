import { Router } from "express";
import { addThread, getThread } from "../controllers/thread.js"
const router = Router();

router.route('/').get(getThread).post(addThread);


export default router;