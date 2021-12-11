import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { BoardType } from '../types'

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Board = mongoose.model<BoardType>('Board', boardSchema)

export default Board
