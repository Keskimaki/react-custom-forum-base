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
  threads: Array
})

boardSchema.plugin(mongooseUniqueValidator)

const Board = mongoose.model('Board', boardSchema)

export default Board
