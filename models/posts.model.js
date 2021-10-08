const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    posts: [
        {
            caption: { type: String },
            image: { type: String },
            likes: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            ],
            comments: [
                {
                    text: "",
                    likes: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'User'
                        }
                    ],
                    commentBy: {
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                    }
                }
            ]
        }
    ]
}, { timestamps: true })
const Post = mongoose.model('Post', postSchema)

module.exports = { Post }