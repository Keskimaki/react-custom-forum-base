import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { UserType } from '../types'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    select: false,
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
  image: String,
  details: {
    name: String,
    location: String,
    description: String
  }
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model<UserType>('User', userSchema)

export default User
