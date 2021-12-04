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

postSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Post = mongoose.model('Post', postSchema)

export default Post
