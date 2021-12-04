import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  status: String,
  date: Date,
  responseTo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post'
  },
  repliesTo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post'
  },  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  }
})

const Post = mongoose.model('Post', postSchema)

export default Post
