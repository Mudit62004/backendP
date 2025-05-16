import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller";

const router = Router()
router.use(verifyJWT)

router
.route("/c/:channelId").post(verifyJWT, toggleSubscription)
.get(verifyJWT, getUserChannelSubscribers)
router.route("/u/:subscriberId").get(getSubscribedChannels)

export default router