import express from 'express'
import User from '../models/user'
import Board from '../models/board'
import Thread from '../models/thread'
import Post from '../models/post'

const testingRouter = express.Router()

testingRouter.post('/reset', async (_req, res) => {
  await Post.deleteMany({})
  await Thread.deleteMany({})
  await Board.findOneAndUpdate({ url: 'TEST' }, { threads: [] })
  await User.deleteMany({})

  res.status(204).end()
})

export default testingRouter