import {playlist} from "../models/playlist.model.js"
import { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {Video} from "../models/video.model.js"

const createPlaylist = asyncHandler(async(req , res)=> {
//get name and description
//upload on mongo
//return res

//get name and description
const {name, description} = req.body
if (!name) {
    throw new ApiError(400,"Name for playlist required")
}
if (!description) {
    throw new ApiError(400, "Description for playlist is required")
}

const user = await User.findOne({
    refreshToken: req.cookies.refreshToken
})
if (!user) {
    throw new ApiError(400,"User not found for playlist ")
}

//uploading on mongo
try {
    const playlist = await playlist.create({
        name: name,
        description: description,
        owner: user._id
    })
    if (!playlist) {
        throw new ApiError(400, "Error while creating platlist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully"))
} catch (error) {
    throw new ApiError(400, `Error while creating playlist ${error}`)
}

})

//get User playlist
const getUserPlaylists = asyncHandler(async(req , res)=> {
    const userId = req.params

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId")
    }

    const user = await User.findById(req.user?._id)
})

