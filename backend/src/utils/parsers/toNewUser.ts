//import fs from 'fs'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import { isArray, isString, isObjectIdList } from '.'
import { UserType, UserDetails } from "../../types"
//import uploadImage from '../uploadImage'

const parseUsername = (username: unknown): string => {
  if (!username || !isString(username) || username.length < 3) {
    throw new Error('Incorrect or missing username')
  }
  return username
}

const parseNewPassword = async (password: unknown): Promise<string> => {
  if (!password || !isString(password) || password.length < 5) {
    throw new Error('Incorrect or missing password')
  }
  const passwordHash = await bcrypt.hash(password, 10)
  return passwordHash
}

const parseEmail = (email: unknown) => {
  if (!email || !isString(email) || [-1, 0, email.length - 1].includes(email.indexOf('@')) ) {
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
  if (!password || !isString(password) || password.length < 5) {
    throw new Error('Incorrect or missing password')
  }
  return password
}

export const toLogin = ({ username, password}: { username: unknown, password: unknown}): { username: string, password: string } => {
  const loginData = {
    username: parseUsername(username),
    password: parsePassword(password)
  }
return loginData
}

const parseFollowing = (following: unknown): ObjectId[] => {
  if (!following || !isArray(following) || !isObjectIdList(following)) {
    throw new Error('Incorrect following')
  }
  return following
}

const parseString = (text: unknown, type: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${type}`)
  }
  return text
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDetails = (details: any): UserDetails => {
  const newDetails: UserDetails = {
    name: parseString(details.name, 'name'),
    location: parseString(details.location, 'location'),
    description: parseString(details.description, 'description')
  }
  return newDetails
}

const parseImage = (image: unknown): string => {
  if (!image || !isString(image)) {
    throw new Error('Incorrect or missing image url')
  }
  return image
}

type Edit = {
  following?: ObjectId[],
  details?: UserDetails,
  email?: string,
  image?: string
}

export const toEditUser = ({ following = null, details, email, image }: { following: unknown, details: unknown, email: unknown, image: unknown }): Edit => {
  const editUser: Edit = {
    following: following ? parseFollowing(following) : undefined,
    details: details ? parseDetails(details) : undefined,
    email: email ? parseEmail(email) : undefined,
    image: image ? parseImage(image) : undefined
  }
  return editUser
}

export default toNewUser