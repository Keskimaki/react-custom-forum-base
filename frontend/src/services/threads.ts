import axios from 'axios'
import env from '../.env'
import { ThreadType } from '../types'

const baseUrl = `${env.API_BASE_URL}/api/threads`

const makeThread = async (name: string, user: string, board: string, token: string) => {
  const newThread = {
    name,
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