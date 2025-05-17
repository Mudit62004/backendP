import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";


const router = Router()

router.route("/").post(verifyJWT, createPlaylist)

router.route("/:playlistId").get(verifyJWT, getPlaylistById)

router.route("/update/:playlistId").patch(verifyJWT, updatePlaylist)
router.route("/delete/:playlistId").delete(verifyJWT, deletePlaylist)

router.route("/:add/:videoOd/:playlistId").patch(verifyJWT, addVideoToPlaylist)

router.route("/remove/:videoId/:playlistId").patch(verifyJWT, removeVideoFromPlaylist)

router.route("/user/:userId").get(getUserPlaylists)

export default router