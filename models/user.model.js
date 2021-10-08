const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: { type: String, lowercase: true, unique: true, index: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String },
    coverImg: { type: String },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    likedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    savedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, { timestamps: true })
const User = mongoose.model('User', userSchema)

module.exports = { User }