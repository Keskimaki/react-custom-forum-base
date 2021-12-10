import axios from 'axios'
import { LoggedUser } from '../types'

const baseUrl = 'http://localhost:3003/api/login'

const login = async (username: string, password: string): Promise<LoggedUser | undefined> => {
  try {
    const res = await axios.post<LoggedUser>(baseUrl, { username, password })
    res.data.token = `bearer ${res.data.token}`
    return res.data
  } catch {
    //const noUser: LoggedUser = { token: '', username: '', privileges: 'guest', id: '' }
    return undefined
  }
}

const loginService = {
  login
}

export default loginService