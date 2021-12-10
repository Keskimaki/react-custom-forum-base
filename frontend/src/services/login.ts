import axios from 'axios'
import { LoggedUser } from '../types'

const baseUrl = 'http://localhost:3003/api/login'

const login = async (username: string, password: string) => {
  const res = await axios.post<LoggedUser>(baseUrl, { username, password })
  res.data.token = `bearer ${res.data.token}`
  return res.data
}

const loginService = {
  login
}

export default loginService