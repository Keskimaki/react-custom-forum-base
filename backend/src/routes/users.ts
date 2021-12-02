import express from 'express'
//TODO database
import users from '../mockdata/users'
import User from '../models/user'

const userRouter = express.Router()

userRouter.get('/', (_req, res) => {
  res.send(users)
})

userRouter.post('/', (req, res) => {
  //Assume that sent data is correct for now
  const user = new User(req.body)
  user.save()
  res.status(201).send(user)
})

export default userRouter