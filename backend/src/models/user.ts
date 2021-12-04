import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

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

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('User', userSchema)

export default User
