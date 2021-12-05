import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = async (username: string, password: string) => {
  const res = await axios.post(baseUrl, { username, password })
  return res.data
}

const loginService = {
  login
}

export default loginService