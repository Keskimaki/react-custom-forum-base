import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import toNewUser, { toEditUser, toImageUrl } from '../utils/parsers/toNewUser'
import { UserType } from '../types'
import getToken from '../utils/getToken'
import imageService from '../utils/imageService'

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
  if (!user) {
    return res.status(400).json({ error: 'invalid id' })
  }
  const editData = toEditUser(req.body)
  await User.findByIdAndUpdate(req.params.id, editData)
  res.status(204).end()
})

userRouter.put('/:id/image', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const user: UserType | null = await User.findById(req.params.id)
  if (!user) {
    return res.status(400).json({ error: 'invalid id' })
  }
  const imageUrl = toImageUrl(req.body)
  await imageService.downloadImage(imageUrl, `${user.username}.png`)
  imageService.uploadImage('forumbaseuserprofiles', `${user.username}.png`)
  await User.findByIdAndUpdate(req.params.id, { image: true })
  res.status(204).end()
})

userRouter.delete('/:id', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const user: UserType | null = await User.findById(req.params.id).select('+passwordHash')
  const passwordCorrect = user
    ? await bcrypt.compare(req.body.password, user.passwordHash)
    : false
  if (!passwordCorrect) {
    return res.status(401).json({ error: 'invalid user or password' })
  }
  await User.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default userRouter
