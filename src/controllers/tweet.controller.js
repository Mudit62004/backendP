import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const createTweet = asyncHandler(async(req , res)=>{

    //get content, ljnk with user
    //store on mongo
    // return res

    //get content and user
    const content = req.body
    const user = await User.findById(req.user?._id)

    if (!content) {
        throw new ApiError(400, "Content is required")
    }

    if (!user) {
        throw new ApiError(400, "User cannot be found")
    }

    //storing content on mongo
    const tweet = await Tweet.create({
        owner: user._id,
        content: content
    })

    //returing the response
    return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet crested successfully"))
})


// getting user tweets
const getUserTweets = asyncHandler(async(req , res)=> {
    const userId = req.params
    if (!userId) {
        throw new ApiError(400, "User Id cant be found")
    }

    //query the tweet collection to find all tweet by the user
    const userTweets = await Tweet.find({ owner: userId})
    if (!userTweets) {
        throw new ApiError(400, "Tweet collection cannot be found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, userTweets, "Tweet fetched successfully"))
})

const updateTweet = asyncHandler(async(req , res)=>{
    const tweetId = req.params
    if (!tweetId) {
        throw new ApiError(400, "Tweet Id cannot be found for updation")
    }

    //only owner can update the tweet
    const tweet = await User.findById(tweetId)
    if (!tweet) {
        throw new ApiError(400, "Can't find Tweet")
    }

    const user = await User.findOne({
        refreshToken: req.cookies.refreshToken
    })
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if (!tweet?.owner.equals(user._id.toString())) {
        const content = req.body

        if (!content) {
            throw new ApiError(400, "Please provide content for tweet updation")
        }

        tweet.content = content
        await tweet.save({validateBeforeSave: false})

        return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet update successfully"))
    }
    else{
        throw new ApiError(400, "only the owner can update the tweet")
    }
})

const deleteTweet = asyncHandler(async(req , res)=> {
    const tweetId = req.params

    if (!tweetId) {
        throw new ApiError(400, "TweetId not fetched for deletion of tweet")
    }

    const tweet = await Tweet.findById(tweetId)
    const user = await User.findOne({
        refreshToken: req.cookies.refreshToken
    })
    if (!user) {
        throw new ApiError(404, "User not found for deletion")
    }

    //only the owner can delete the tweet
    if (tweet?.owner.equals(user?._id.toString())) {
        await Tweet.findByIdAndDelete(tweetId)
        
        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Tweet deleted successfully"))
    } else {
        throw new ApiResponse(401, "Only user can delete the tweet")
    }
})

export{
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}