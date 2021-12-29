import express from 'express'
import Post from '../models/post'
import Thread from '../models/thread'
import Board from '../models/board'
import User from '../models/user'
import getToken from '../utils/getToken'
import threadParser from '../utils/parsers/threadParser'
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
  const newThread: ThreadType = threadParser.toNewThread(req.body)
  const savedThread: ThreadType = await new Thread(newThread).save()

  await Board.findByIdAndUpdate(newThread.board, { $push: { threads: savedThread.id } })
  res.status(201).json(savedThread)
})

threadRouter.put('/:id', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const thread: ThreadType | null = await Thread.findById(req.params.id)
  const user: UserType | null = await User.findById(req.body.userId)
  if (!thread) {
    return res.status(400).json({ error: 'invalid id' })
  } else if (!user || user.privileges === 'user') {
    return res.status(401).json({ error: 'invalid user' })
  }
  const editData = threadParser.toEditThread(req.body)
  await Thread.findByIdAndUpdate(req.params.id, editData)
  res.status(204).end()
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
  } else if(user?.privileges === 'user' && thread.posts.length > 3) {
    return res.status(401).json({ error: 'user cannot delete active thread' })
  }
  await Board.findByIdAndUpdate(thread.board, { $pull: { threads: thread.id }})
  await Post.deleteMany({ thread: req.params.id})
  await Thread.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default threadRouter
