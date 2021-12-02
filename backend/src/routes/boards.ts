import express from 'express'
//TODO database
import boards from '../mockdata/boards'

const boardRouter = express.Router()

boardRouter.get('/', (_req, res) => {
  res.send(boards)
})

export default boardRouter