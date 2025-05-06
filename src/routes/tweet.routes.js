import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller";


const router = Router()

router.route("/").post(verifyJWT, createTweet)
router.route("/user/:userId").get(verifyJWT, getUserTweets)
router.route("/:tweetId").patch(verifyJWT, updateTweet)
router.route("/:tweetId").patch(verifyJWT, deleteTweet)

export default router