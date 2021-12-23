import axios from 'axios'
import env from '../.env'
import { BoardType } from '../types'

const baseUrl = `${env.API_BASE_URL}/api/boards`

const getAll = async () => {
  const res = await axios.get<BoardType[]>(baseUrl)
  return res.data
}

const boardService = {
  getAll
}

export default boardService