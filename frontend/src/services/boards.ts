import axios from 'axios'
import { BoardType } from '../types'

const baseUrl = 'http://localhost:3003/api/boards'

const getAll = async () => {
  const res = await axios.get<BoardType[]>(baseUrl)
  return res.data
}

const boardService = {
  getAll
}

export default boardService