import axios from 'axios'
import { UserType, UserDetails } from '../types'

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

type Edit = {
  following?: string[],
  details?: UserDetails,
  email?: string,
  image?: string
}

const editUser = async (editData: Edit, userId: string, token: string) => {
  await axios.put(`${baseUrl}/${userId}`, editData, { headers: { Authorization: token } })
}

const deleteUser = async (userId: string, password: string, token: string) => {
  await axios.delete(`${baseUrl}/${userId}`, { headers: { Authorization: token }, data: { password } })
}

const userService = {
  getAll,
  createAccount,
  editUser,
  deleteUser
}

export default userService
