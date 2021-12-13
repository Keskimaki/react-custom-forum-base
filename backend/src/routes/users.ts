import express from 'express'
import User from '../models/user'
import toNewUser, { toEditUser } from '../utils/parsers/toNewUser'
import { UserType } from '../types'
import getToken from '../utils/getToken'

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

userRouter.put('/:id', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const user: UserType | null = await User.findById(req.params.id)
  console.log(user?.following)
  if (!user) {
    return res.status(400).json({ error: 'invalid id' })
  }
  const editData = toEditUser(req.body)
  console.log(editData)
  await User.findByIdAndUpdate(req.params.id, editData)
  res.status(204).end()
})

export default userRouter
