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

const editUser = async (following: string[], userId: string, token: string) => {
  await axios.put(`${baseUrl}/${userId}`, { following }, { headers: { Authorization: token } })
}

const userService = {
  getAll,
  createAccount,
  editUser
}

export default userService