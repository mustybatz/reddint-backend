import { Router } from "express";
import commentRouter from "./comments.routes";
import postsRouter from "./posts.routes";
import subreddintRouter from "./subreddint.routes";
import userRouter from "./user.routes";

const router = Router();

router.use('/users', userRouter);
router.use('/subreddints', subreddintRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentRouter);

export default router;