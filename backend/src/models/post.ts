import mongoose from 'mongoose'
import { PostType } from '../types'

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  status: String,
  date: Date,
  edited: Date,
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
  image: Image,
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  }
})

postSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Post = mongoose.model<PostType>('Post', postSchema)

export default Post
