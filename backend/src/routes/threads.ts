import express from 'express'
import Thread from '../models/thread'
import Board from '../models/board'
import checkToken from '../utils/checkToken'
import toNewThread from '../utils/parsers/toNewThread'
import { ThreadType } from '../types'

const threadRouter = express.Router()

threadRouter.get('/', async (_req, res) => {
  const threads = await Thread.find({}).populate('posts')
  res.send(threads)
})

threadRouter.post('/', async (req, res) => {
  if (!checkToken(req)) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const newThread: ThreadType = toNewThread(req.body)
  const savedThread = await new Thread(newThread).save()

  await Board.findByIdAndUpdate(newThread.board, { $push: { threads: savedThread.id } })
  res.status(201).json(savedThread)
})

export default threadRouter
