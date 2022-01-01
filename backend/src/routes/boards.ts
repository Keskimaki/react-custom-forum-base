import express from 'express'
import Board from '../models/board'
import toNewBoard from '../utils/parsers/toNewBoard'
import { BoardType } from '../types'

const boardRouter = express.Router()

boardRouter.get('/', async (_req, res) => {
  const boards: BoardType[] = await Board.
    find({ status: 'open' }).
    populate({
      path: 'threads',
      populate: {
        path: 'posts'
      }
    })
  res.send(boards)
})
//Boards can be created manually on MongoDB, no need for frontend functionality
if (process.env.NODE_ENV === 'test') {
  boardRouter.post('/', async (req, res) => {
    const newBoard: BoardType = toNewBoard(req.body)
    const savedBoard = await new Board(newBoard).save()
    res.status(201).json(savedBoard)
  })
}

export default boardRouter