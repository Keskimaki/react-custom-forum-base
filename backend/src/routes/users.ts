import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user'

const userRouter = express.Router()

userRouter.get('/', async (_req, res) => {
  const users = await User.find({}).populate('posts')
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  //Assume that sent data is correct for now
  const { username, password, email } = req.body
  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    passwordHash,
    email,
    date: new Date(),
    posts: [],
    following: [],
    privileges: 'user',
  })
  
  const savedUser = await newUser.save()
  res.status(201).json(savedUser)
})

export default userRouter
