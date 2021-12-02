import express from 'express'
//TODO database
import users from '../mockdata/users'

const userRouter = express.Router()

userRouter.get('/', (_req, res) => {
  res.send(users)
})

export default userRouter