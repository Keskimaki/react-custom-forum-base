import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import parser from '.'
import { UserType, UserDetails } from "../../types"

const parseUsername = (username: unknown): string => {
  if (!username || !parser.isString(username) || username.length < 3) {
    throw new Error('Incorrect or missing username')
  }
  return username
}

const parseNewPassword = async (password: unknown): Promise<string> => {
  if (!password || !parser.isString(password) || password.length < 5) {
    throw new Error('Incorrect or missing password')
  }
  const passwordHash = await bcrypt.hash(password, 10)
  return passwordHash
}

const parseEmail = (email: unknown) => {
  if (!email || !parser.isString(email) || [-1, 0, email.length - 1].includes(email.indexOf('@')) ) {
    throw new Error('Incorrect email')
  }
  return email
}

type Fields = { username: unknown, password: unknown, email: unknown }

const toNewUser = async ({ username, password, email }: Fields): Promise<UserType> => {
  const NewUser: UserType = {
    username: parseUsername(username),
    passwordHash: await parseNewPassword(password),
    email: email ? parseEmail(email) : undefined,
    date: new Date(),
    posts: [],
    following: [],
    privileges: 'user',
  }
  return NewUser
}

const parsePassword = (password: unknown): string => {
  if (!password || !parser.isString(password) || password.length < 5) {
    throw new Error('Incorrect or missing password')
  }
  return password
}

const toLogin = ({ username, password}: { username: unknown, password: unknown}): { username: string, password: string } => {
  const loginData = {
    username: parseUsername(username),
    password: parsePassword(password)
  }
return loginData
}

const parseFollowing = (following: unknown): ObjectId[] => {
  if (!following || !parser.isArray(following) || !parser.isObjectIdList(following)) {
    throw new Error('Incorrect following')
  }
  return following
}

const parseString = (text: unknown, type: string): string => {
  if (!text || !parser.isString(text)) {
    throw new Error(`Incorrect or missing ${type}`)
  }
  return text
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDetails = (details: any): UserDetails => {
  const newDetails: UserDetails = {
    name: details.name ? parseString(details.name, 'name'): undefined,
    location: details.location ? parseString(details.location, 'location') : undefined,
    description: details.description ? parseString(details.description, 'description') : undefined
  }
  return newDetails
}

type Edit = {
  following?: ObjectId[],
  details?: UserDetails,
  email?: string,
  passwordHash?: string
}

type EditFields = { following: unknown, details: unknown, email: unknown, newPassword: unknown }

const toEditUser = async ({ following = null, details, email, newPassword }: EditFields): Promise<Edit> => {
  const editUser: Edit = {
    following: following ? parseFollowing(following) : undefined,
    details: details ? parseDetails(details) : undefined,
    email: email ? parseEmail(email) : undefined,
    passwordHash: newPassword ? await parseNewPassword(newPassword) : undefined
  }
  return editUser
}

const toImageUrl = ({ imageUrl }: { imageUrl: unknown }): string => {
  return parseString(imageUrl, 'image url')
}

const userParser = {
  toNewUser,
  toEditUser,
  toLogin,
  toImageUrl
}

export default userParser