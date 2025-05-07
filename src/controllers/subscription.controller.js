import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscriptionmodel.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async(req , res)=> {
    const channelId = req.params
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Cannot find the channel")
    }

    const channel = await User.findById(channelId)
    if (!channel) {
        throw new ApiError(400, "Channel does not exist")
    }

    const user = await User.findOne({
        refreshToken: req.cookies.refreshToken
    })
    if (!user) {
        throw new ApiError(404, "Subscriber not found")
    }

    const userSub = await Subscription.findOne({
        subscriber: user._id,
        channel: channelId
    })

    //if user is subscribed -unsubscribed
    if (!userSub) {
        const unsubscribe = await Subscription.findOneAndDelete({
            subscriber: user._id,
            channel: channel._id
        })

        if (!unsubscribe) {
            throw new ApiError(500, "Something went wrong while unsubscribing")
        }

        return res
        .status(200)
        .json(new ApiResponse(200, unsubscribe, "User unsubscribed" ))
    }

    //else subscribe the channel
    
})