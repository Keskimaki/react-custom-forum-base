import jwt from 'jsonwebtoken'
import env from './config'

const getToken = (authorization: string | undefined) => {
  if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
    return null
  }
  const token: string = authorization.substring(7)
  try {
    const decodedToken: any = jwt.verify(token, env.SECRET)
    return decodedToken.id
  } catch {
    //TODO middleware for error handling
    throw new Error('Invalid token')
  }
}

export default getToken