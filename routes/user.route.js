const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

const secret = process.env['SECRET'];

router.get('/getUserData', authorizedUser, async (req, res) => {
    const { username } = req.body;
    try {
        const userData = await User.findOne({ username: username })
            .populate({ path: 'followers', populate: 'User', select: 'name' })
            .populate({ path: 'following', populate: 'User', select: 'name' })
            .populate({ path: 'savedPosts', populate: 'Post' })
        res.json({
            success: true,
            result: userData
        })
    } catch (e) {
        console.log(e.message);
        res.status(501).json({
            success: false,
            error: e.message,
            result: "Unable to fetch data"
        })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username: username })
        if (user === null) {
            return res.status(404).json({
                success: false,
                result: "No user found"
            })
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const token = jwt.sign({ username: user.username, userId: user._id }, secret, { expiresIn: '24h' });
            res.json({
                success: true,
                result: token
            })
        } else {
            return res.status(401).json({
                success: false,
                result: "Wrong Password"
            })
        }
    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            success: false,
            error: e.message,
            result: "No user found"
        })
    }
})

router.post('/signup', async (req, res) => {
    const { username, password, name, email, profileImg, coverImg } = req.body
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            password: encryptedPassword,
            name: name,
            email: email,
            profileImg: profileImg,
            coverImg: coverImg
        })
        const user = await newUser.save();
        const token = jwt.sign({ username: user.username, userId: user._id }, secret, { expiresIn: '24h' });
        res.status(201).json({
            success: true,
            comment: "User created",
            result: token
        })
    } catch (e) {
        console.log(e.message);
        res.status(409).json({
            success: false,
            error: e.message,
            result: 'User not created'
        })
    }
})

module.exports = router