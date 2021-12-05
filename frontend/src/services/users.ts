import axios from 'axios'
import { User } from '../types'

const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
  const res = await axios.get<User[]>(baseUrl)
  return res.data
}

const createAccount = async (username: string, password: string, email: string) => {
  await axios.post(baseUrl, {
    username,
    password,
    email: email ? email: null
  })
}

const userService = {
  getAll,
  createAccount
}

export default userService