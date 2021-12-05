import jwt from 'jsonwebtoken'
import env from './config'

//Typing need to be fixed
const checkToken = (req: any) => {
  const token = getToken(req)
  const decodedToken: any = jwt.verify(token, env.SECRET)
  if (!token || !decodedToken.id) {
    return null
  }
  return decodedToken.id
}

const getToken = (req: any) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

export default checkToken