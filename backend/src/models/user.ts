import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  posts: Array,
  following: Array,
  privileges: String,
  details: String
})

const User = mongoose.model('User', userSchema)

export default User