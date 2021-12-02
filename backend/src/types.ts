import { ObjectId } from 'mongodb'

export type Privileges = 'admin' | 'mod' | 'user' | 'guest'

export type BoardStatus = 'open' | 'closed' | 'admin'

export type ThreadStatus = 'open' | 'closed' | 'removed' | 'waiting'

export type PostStatus = 'visible' | 'removed' | 'deleted' | 'waiting'

export interface User {
  username: string,
  passwordHash: string,
  email?: string,
  date: Date,
  posts: ObjectId[],
  following: ObjectId[],
  privileges: Privileges
  details?: string //Expand later
  id: ObjectId
}

export interface BoardType {
  name: string,
  description: string,
  status: BoardStatus,
  url?: string,
  threads: ThreadType[]
}

export interface ThreadType {
  name: string,
  user?: ObjectId,
  date: Date,
  status: ThreadStatus,
  posts: PostType[]
}

export interface PostType {
  user?: ObjectId,
  content: string,
  date: Date,
  responseTo: ObjectId[],
  repliesTo: ObjectId[],
  status: PostStatus
}
