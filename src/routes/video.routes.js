import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "jsonwebtoken";
import { deleteVideo, getAllVideos, publishVideo, togglePublishStatus, updateVideoDetails } from "../controllers/video.controller.js";


const router = Router()

router.route("/publish-video").post(verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount:1
        }
    ]),
    publishVideo
)

router.route("/get-all-videos").get(getAllVideos)
router.route("/:videoId").get(verifyJWT, getAllVideos)
router.route("/update-videos/:videoId").post(verifyJWT, upload.single("thumbnail"),updateVideoDetails)
router.route("/delete-videos/:videoId").delete(verifyJWT, deleteVideo)
router.route("/toggle-publish-status/:videoId").post(verifyJWT, togglePublishStatus)

export default router