import express from 'express'
import User from '../models/user'
import toNewUser from '../utils/parsers/toNewUser'
import { UserType } from '../types'

const userRouter = express.Router()

userRouter.get('/', async (_req, res) => {
  const users: UserType[] = await User.find({}).populate('posts')
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const newUser: UserType = await toNewUser(req.body)
  const savedUser = await new User(newUser).save()
  res.status(201).json(savedUser)
})

export default userRouter
