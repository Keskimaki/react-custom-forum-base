import jwt from 'jsonwebtoken'
import env from './config'

const getToken = (authorization: string | undefined) => {
  if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
    return null
  }
  const token: string = authorization.substring(7)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = jwt.verify(token, env.SECRET) //Not worth wasting anymore time for typing
    console.log(decodedToken)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return decodedToken.id
  } catch {
    //TODO middleware for error handling
    throw new Error('Invalid token')
  }
}

export default getToken