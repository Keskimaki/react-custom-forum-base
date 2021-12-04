import express from 'express'
import Board from '../models/board'
import { BoardType } from '../types'

const boardRouter = express.Router()

boardRouter.get('/', async (_req, res) => {
  const boards: BoardType[] = await Board.
    find({}).
    populate({
      path: 'threads',
      populate: {
        path: 'posts'
      }
    })
  res.send(boards)
})

boardRouter.post('/', async (req, res) => {
  //Assume that sent data is correct for now
  const { name, description, status, url } = req.body

  const newBoard = new Board({
    name,
    description,
    status: status ? status : 'open',
    url
  })

  const savedBoard = await newBoard.save()
  res.status(201).json(savedBoard)
})

export default boardRouter