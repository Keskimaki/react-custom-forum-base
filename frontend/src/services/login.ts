import axios from 'axios'
import env from '../.env'
import { LoggedUser } from '../types'

const baseUrl = `${env.API_BASE_URL}/api/login`

const login = async (username: string, password: string): Promise<LoggedUser | undefined> => {
  try {
    const res = await axios.post<LoggedUser>(baseUrl, { username, password })
    res.data.token = `bearer ${res.data.token}`
    return res.data
  } catch {
    return undefined
  }
}

const loginService = {
  login
}

export default loginService