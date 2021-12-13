import axios from 'axios'
import { UserType } from '../types'

const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
  const res = await axios.get<UserType[]>(baseUrl)
  return res.data
}

const createAccount = async (username: string, password: string, email: string) => {
  const res = await axios.post<UserType>(baseUrl, {
    username,
    password,
    email: email ? email: null
  })
  return res.data
}

const userService = {
  getAll,
  createAccount
}

export default userService