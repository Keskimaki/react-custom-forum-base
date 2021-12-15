import jwt from 'jsonwebtoken'
import env from './config'

type token = {
  username: string,
  id: string
}

const getToken = (authorization: string | undefined): string | null => {
  if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
    return null
  }
  const token: string = authorization.substring(7)
  try {
    const decodedToken = jwt.verify(token, env.SECRET)
    return (decodedToken as token).id
  } catch {
    //TODO middleware for error handling
    throw new Error('Invalid token')
  }
}

export default getToken