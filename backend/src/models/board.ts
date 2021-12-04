import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  status: String,
  url: String,
  threads: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Thread'
  }
})

boardSchema.plugin(mongooseUniqueValidator)

boardSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Board = mongoose.model('Board', boardSchema)

export default Board
