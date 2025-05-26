import { Router } from "express";
import {verfiyJwT} from "../middlewares/auth.middleware.js"
import { getChannelStats,getChannelVideos } from "../controllers/dashboard.controller.js";

const router = Router()

router.route("/stats").get(verfiyJwT,getChannelStats);
router.route("/videos").get(verfiyJwT, getChannelVideos);

export default router 