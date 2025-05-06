import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloundinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import {Video} from "../models/video.model.js"



const publishVideo = asyncHandler(async (req , res) =>{
    /*
    get title and description
    get video and thumnail
    upload on cloudinarry
    upload on mongo
    return res
    */

    const {title, description}= req.body // jwt to check if the user is logged in
    console.log(title)

    if (!(title, description)) {
        throw new ApiError(400, "title and description for a video is req")
    }

    //get video thumbnail

    const videoLocalPath = req.files?.videoFile[0].path 
    if (!videoLocalPath) {
        throw new ApiError(400, "No video file found")
    }

    const thumbnailLocalPath = req.files?.thumbnail[0].path
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "No thumbnail found")
    }

    //upload on cloudinary

    const videoFile = await uploadOnCloundinary(videoLocalPath)
    if (!videoFile) {
        throw new ApiError(400, "video not upload on cloudinary")
    }

    const thumbnail= await uploadOnCloundinary(thumbnailLocalPath)
    if (!thumbnail) {
        throw new ApiError(400, "thumbnail not uploaded on cloudinary")
    }

    //getting the user
    const user = User.findById(req.user?._id)

    //store data on mongo
    const video = await VideoColorSpace.create({
        videoFile: videoFile.secure_url,
        thumbnail: thumbnail.url,
        owner: user._id,
        title: title,
        description: description || "",
        duration: videoFile.duration
    })

    //return the res
    return res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded successfully"))

})

// getting all videos

const getAllVideos = asyncHandler(async(req , res) => {
    const {page =1, limit = 10 , query, sortBy, sortType} = req.query

    const user = await User.find({
        refreshToken: req.cookies.refreshToken
    })

    const pageNumber = parseInt(page)
    const limitOfComments = parseInt(limit)

    if (!user) {
        throw new ApiError(400, "User is required")
    }

    const skip = (pageNumber - 1) * limitOfComments
    const pageSize = limitOfComments;

    const videos = await Video.aggregatePaginate(
        Video.aggregate([
            {
                $match: {
                    $or: [
                        {title: {$regex: query, $options: 'i'}},
                        {description: {$regex: query, $options: '1'}}
                    ],
                    isPublished: true,
                    owner: user._id
                }
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "video",
                    as: "likes"
                }
            },
            {
                $addFields: {
                    likes: {$size: "$likes"}
                }
            },
            {
                $project: {
                    "_id": 1,
                    "videoFile": 1,
                    "thumbnail": 1,
                    "title": 1,
                    "description": 1,
                    "duration": 1,
                    "views": 1,
                    "isPublished": 1,
                    "owner": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "likes": 1
                }
            },
            { $sort: { [sortBy]: sortType === 'asc'? 1: -1} },
            {$skip:skip},
            { $limit: pageSize }
        ])
    );

    if (videos.length === 0) {
        return res
        .status(200)
        .json(new ApiResponse (200, "no videos available"))
    }

    //Return the videos
    return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"))
})

const deleteVideo = asyncHandler(async(req , res)=> {
    const { videoId } = req.params
    
    if (!videoId) {
        throw new ApiError(400, "videoId cant be fetched")
    }

    const video = await Video.findById(videoId)
    const user = await User.findOne({
        refreshToken: req.cookies.refreshToken,
    })

    if (!user) {
        throw new ApiError(400, "User not found")
    }

    // only the owner can delete the video
    if (video?.owner.equal(user._id.toString())) {
        await Video.findByIdAndDelete(videoId)

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully")
    )
    }
    else{
        throw new ApiError(401, "Only user can delete the video")
    }
})

const togglePublishStatus = asyncHandler(async(req, res)=>{
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "videoId can't be fetched to toogle")
    }

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }
    video.isPublished = !video.isPublished

    await video.save({ validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, video.isPublished, "Video publish tooged successfully"))
})

export{
    publishVideo,
    getAllVideos,
    deleteVideo,
    togglePublishStatus

}