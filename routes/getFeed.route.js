const express = require('express')
const router = express.Router();
const { Post } = require('../models/posts.model')
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

router.get('/', authorizedUser, async (req, res) => {
    const { username } = req.body
    try {
        const { following } = await User.findOne({ username: username }, 'following')
        const data = await Post.find({ postedBy: { $in : following } });
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

module.exports = router