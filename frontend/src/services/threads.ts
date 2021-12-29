import axios from 'axios'
import env from '../config'
import { ThreadType, ThreadStatus } from '../types'

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

const editThread = async (status: ThreadStatus, threadId: string, userId: string, token: string ) => {
  const editData = {
    status,
    userId
  }
  await axios.put(`${baseUrl}/${threadId}`, editData, { headers: { Authorization: token } })
}

const deleteThread = async (threadId: string, userId: string, token: string) => {
  await axios.delete(`${baseUrl}/${threadId}`, { headers: { Authorization: token }, data: { userId } })
}

const threadService = {
  makeThread,
  editThread,
  deleteThread
}

export default threadService