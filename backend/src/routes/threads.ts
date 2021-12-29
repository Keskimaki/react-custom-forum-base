import express from 'express'
import Post from '../models/post'
import Thread from '../models/thread'
import Board from '../models/board'
import User from '../models/user'
import getToken from '../utils/getToken'
import toNewThread from '../utils/parsers/toNewThread'
import { ThreadType, UserType } from '../types'

const threadRouter = express.Router()

threadRouter.get('/', async (_req, res) => {
  const threads = await Thread.find({}).populate('posts')
  res.send(threads)
})

threadRouter.post('/', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const newThread: ThreadType = toNewThread(req.body)
  const savedThread: ThreadType = await new Thread(newThread).save()

  await Board.findByIdAndUpdate(newThread.board, { $push: { threads: savedThread.id } })
  res.status(201).json(savedThread)
})

threadRouter.delete('/:id', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const thread: ThreadType | null = await Thread.findById(req.params.id)
  const user: UserType | null = await User.findById(req.body.userId)
  if (!thread) {
    return res.status(400).json({ error: 'invalid id' })
  } else if (String(thread.user) !== req.body.userId && user?.privileges === 'user') {
    return res.status(401).json({ error: 'invalid user' })
  }
  Post.deleteMany({ thread: req.params.id})
  Thread.findByIdAndDelete(req.params.id)
})

export default threadRouter
