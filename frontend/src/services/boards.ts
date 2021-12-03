import axios from 'axios'
import { BoardType } from '../types'

const baseUrl = 'http://localhost:3003/api/boards'

const getAll = async (setData: (value: React.SetStateAction<BoardType[]>) => void) => {
  const res = await axios.get(baseUrl)
  setData(res.data)
}

const boardService = {
  getAll
}

export default boardService