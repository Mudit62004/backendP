import { Router } from "express";
import { getLikedVideos,
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
 } from "../controllers/like.controller";
import {verfiyJwT} from "../middlewares/auth.middleware.js"

const router = Router()
router.route("/toggle/v/:videoId").post(verfiyJwT,toggleVideoLike);
router.route("/toggle/c/:commentId").post(verfiyJwT, toggleCommentLike);
router.route("/toggle/t/:tweetId").post(verfiyJwT, toggleTweetLike);
router.route("/videos").get(verfiyJwT,getLikedVideos);

export default router