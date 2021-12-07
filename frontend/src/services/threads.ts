import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/threads'

const makeThread = async (name: string, user: string, board: string, token: string) => {
  const newThread = {
    name,
    user,
    board,
    status: 'open'
  }
  const res = await axios.post(baseUrl, newThread, { headers: { Authorization: token } })
  return res.data
}

const threadService = {
  makeThread
}

export default threadService