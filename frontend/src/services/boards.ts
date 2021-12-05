import axios from 'axios'
import { BoardType } from '../types'

const baseUrl = 'http://localhost:3003/api/boards'

const getAll = async () => {
  const res = await axios.get<BoardType[]>(baseUrl)
  return res.data
}

const makePost = async (content: string, user: string, thread: string) => {
  const newPost = {
    content,
    user,
    thread,
    responseTo: [],
    status: 'visible'
  }
  const res = await axios.post('http://localhost:3003/api/posts', newPost)
  return res.data
}

const boardService = {
  getAll,
  makePost
}

export default boardService