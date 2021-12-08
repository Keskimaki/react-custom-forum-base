import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { NewUser } from '../types'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  email: String,
  date: Date,
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post'
  },
  following: Array,
  privileges: String,
  details: String
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model<NewUser>('User', userSchema)

export default User
