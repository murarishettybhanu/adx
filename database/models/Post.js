const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  mail: String,
  subject: String,
  message: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
