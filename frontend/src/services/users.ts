import axios from 'axios'
import { User } from '../types'

const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
  const res = await axios.get<User[]>(baseUrl)
  return res.data
}

const userService = {
  getAll
}

export default userService