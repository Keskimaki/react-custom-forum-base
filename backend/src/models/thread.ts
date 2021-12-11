import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { ThreadType } from '../types'

const threadSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  description: String,
  date: Date,
  status: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post'
  }
})

threadSchema.plugin(mongooseUniqueValidator)

threadSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Thread = mongoose.model<ThreadType>('Thread', threadSchema)

export default Thread
