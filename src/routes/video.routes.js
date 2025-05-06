import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "jsonwebtoken";
import { deleteVideo, getAllVideos, getVideoById } from "../controllers/video.controller.js";