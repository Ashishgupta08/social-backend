const express = require('express')
const router = express.Router();
const { Post } = require('../models/posts.model')
const { authorizedUser } = require('../utils/authorizedUser')

router.get('/', authorizedUser, async (req, res) => {
    const { userId } = req.body;
    try {
        const data = await Post.findOne({ postedBy: userId });
        res.json({
            success: true,
            result: data
        })
    } catch (e) {
        console.log(e.message);
        res.status(501).json({
            success: false,
            error: e.message,
            result: 'Unable to fetch data'
        })
    }
})

router.post('/', authorizedUser, async (req, res) => {
    const { userId, post } = req.body;
    try {
        const prevData = await Post.findOne({ postedBy: userId })
        if (prevData === null) {
            console.log(post)
            const newPost = new Post({
                postedBy: userId,
                posts: post
            })
            const data = await newPost.save();
            return res.json({
                success: true,
                result: "Post Created Successfully."
            })
        }
        await Post.findOneAndUpdate({ postedBy: userId }, { $push: { posts: post } })
        res.json({
            success: true,
            result: "Post created."
        })
    } catch (e) {
        res.status(501).json({
            success: false,
            error: e.message,
            result: 'Unable to post.'
        })
    }
})

router.post('/like', authorizedUser, async (req, res) => {
    const { postedBy, postId, userId } = req.body;
    try {
        await Post.findOneAndUpdate({ postedBy: postedBy, "posts._id": postId }, { $push: { "posts.$.likes": userId } })
        res.json({
            success: true,
            result: "Post created."
        })
    } catch (e) {
        console.log(e.message);
        res.status(501).json({
            success: false,
            error: e.message,
            result: 'Unable to post.'
        })
    }
})

router.delete('/unlike', authorizedUser, async (req, res) => {
    const { postedBy, postId, userId } = req.body;
    try {
        await Post.findOneAndUpdate({ postedBy: postedBy, "posts._id": postId }, { $pull: { "posts.$.likes": userId } })
        res.json({
            success: true,
            result: "Post created."
        })
    } catch (e) {
        console.log(e.message);
        res.status(501).json({
            success: false,
            error: e.message,
            result: 'Unable to post.'
        })
    }
})

module.exports = router