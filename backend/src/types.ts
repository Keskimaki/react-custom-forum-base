import { ObjectId } from 'mongodb'

export type Privileges = 'admin' | 'mod' | 'user' | 'guest'

export type BoardStatus = 'open' | 'closed'

export type ThreadStatus = 'open' | 'closed'

export type PostStatus = 'visible'

export interface UserDetails {
  name?: string
  location?: string
  description?: string
}

export interface UserType {
  username: string
  passwordHash: string
  email?: string
  posts: ObjectId[]
  date: Date
  following: ObjectId[]
  privileges: Privileges
  image?: boolean
  details?: UserDetails
  id?: ObjectId
}

export interface BoardType {
  name: string
  description: string
  status: BoardStatus
  url: string
  threads: ObjectId[] //ThreadType[]
  id?: ObjectId
}

export interface ThreadType {
  name: string
  user: ObjectId
  date: Date
  status: ThreadStatus
  board: ObjectId
  posts: ObjectId[] //PostType[]
  id?: ObjectId
}

export interface PostType {
  user: ObjectId
  content: string
  date: Date,
  edited?: Date,
  responseTo: ObjectId[]
  repliesTo: ObjectId[]
  status: PostStatus
  thread: ObjectId
  image?: boolean
  id?: ObjectId
}
