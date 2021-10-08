const express = require('express')
const router = express.Router();
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

router.post('/follow', authorizedUser, async (req, res) => {
    const { username, userId, connectionUsername, connectionUserId } = req.body
    try {
        await User.findOneAndUpdate({ username: username }, { $push: { following: connectionUserId } })
        await User.findOneAndUpdate({ username: connectionUsername }, { $push: { followers: userId } })
        res.json({
            success: true,
            result: "Successfully added."
        })
    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            success: false,
            error: e.message,
            result: "Failed to update."
        })
    }
})

router.delete('/unfollow', authorizedUser, async (req, res) => {
    const { username, userId, connectionUsername, connectionUserId } = req.body
    try {
        await User.findOneAndUpdate({ username: username }, { $pull: { following: connectionUserId } })
        await User.findOneAndUpdate({ username: connectionUsername }, { $pull: { followers: userId } })
        res.json({
            success: true,
            result: "Successfully removed."
        })
    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            success: false,
            error: e.message,
            result: "Failed to update."
        })
    }
})

module.exports = router