import mongoose from "mongoose";
import {Comment} from "../models/comment.model.js"
import {ApiError}  from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js" 
import { parse } from "dotenv";

const getVideoComments = asyncHandler(async(req , res)=> {
    const videoId = req.params
    const {page = 1, limit = 10} = req.query

    //check if videoId is a valid ObjectId
    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const pageNumber = parseInt(page)
    const limitOfComments = parseInt(limit)

    //Find the video
    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(400, "Video not found")
    }

    //Find comments for the video
    const comments = await Comment.aggregatePaginate(
        Comment.aggregate([
            {
                $match: {
                    video: video._id
                }
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "comment",
                    as: "likes"
                }
            },
            {
                $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "user"
                }
            },
            {
                $addFields: {
                    likes: {
                        $size: "$likes"
                    },
                    isLiked: {
                        $in: [req.user?.id, "$likes.likedBy"]
                    },
                    username: {
                        $arrayElemAt:["$user.username",0]
                    }
                }
            },
            {
                $project: {
                    username: 1,
                    content:1,
                    likes:1,
                    createdAt: 1,
                    isLiked:1
                }
            },
            {
                $sort: {createdAt: -1}
            }
        ]),
        {page: pageNumber, limit: limitOfComments}
    )
    
})