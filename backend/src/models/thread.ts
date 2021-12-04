import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const threadSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
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
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Thread = mongoose.model('Thread', threadSchema)

export default Thread
