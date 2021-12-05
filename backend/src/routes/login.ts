import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import env from '../utils/config'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user: any = await User.findOne( { username })
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false

    if (!passwordCorrect) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(userForToken, env.SECRET)

    res.status(200).send({
      token,
      username: user.username,
      privileges: user.privileges
    })
})

export default loginRouter