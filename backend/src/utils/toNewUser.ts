import bcrypt from 'bcryptjs'
import { UserType } from "../types"


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseUsername = (username: unknown): string => {
  if (!username || !isString(username) || username.length < 3) {
    throw new Error('Incorrect or missing username')
  }
  return username
}

const parsePassword = async (password: unknown): Promise<string> => {
  if (!password || !isString(password) || password.length < 5) {
    throw new Error('Incorrect or missing password')
  }
  const passwordHash = await bcrypt.hash(password, 10)
  return passwordHash
}

const parseEmail = (email: unknown) => {
  if (!email || !isString(email) || [-1, 0, email.length - 1].includes(email.indexOf('@')) ) {
    throw new Error('Incorrect email')
  }
  return email
}

type Fields = { username: unknown, password: unknown, email: unknown }
type NewUser = Omit<UserType, 'id'>

const toNewUser = async ({ username, password, email }: Fields): Promise<NewUser> => {
  const NewUser: NewUser = {
    username: parseUsername(username),
    passwordHash: await parsePassword(password),
    email: email ? parseEmail(email) : undefined,
    date: new Date(),
    posts: [],
    following: [],
    privileges: 'user',
  }
  return NewUser
}

export default toNewUser