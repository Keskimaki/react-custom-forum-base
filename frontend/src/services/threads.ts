import axios from 'axios'
import { ThreadType } from '../types'

const baseUrl = 'http://localhost:3003/api/threads'

const makeThread = async (name: string/*, description: string*/, user: string, board: string, token: string) => {
  const newThread = {
    name,
    //description,
    user,
    board,
    status: 'open'
  }
  const res = await axios.post<ThreadType>(baseUrl, newThread, { headers: { Authorization: token } })
  return res.data
}

const threadService = {
  makeThread
}

export default threadService