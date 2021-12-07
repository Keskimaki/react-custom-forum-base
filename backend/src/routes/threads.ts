import express from 'express'
import Thread from '../models/thread'
import Board from '../models/board'
import checkToken from '../utils/checkToken'

const threadRouter = express.Router()

threadRouter.get('/', async (_req, res) => {
  const threads = await Thread.find({}).populate('posts')
  res.send(threads)
})

threadRouter.post('/', async (req, res) => {
  if (!checkToken(req)) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const { name, user, board, status } = req.body
  //Assume sent data is correct
  const newThread = new Thread({
    name,
    user,
    date: new Date(),
    board,
    posts: [],
    status: status ? status : 'open'
  })

  const savedThread = await newThread.save()
  await Board.findByIdAndUpdate(board, { $push: { threads: savedThread.id } })
  res.status(201).json(savedThread)
})

export default threadRouter
