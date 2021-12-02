import { ObjectId } from 'mongodb'

export type Privileges = 'admin' | 'mod' | 'user' | 'guest'

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
  threads: ThreadType[]
}

export interface ThreadType {
  name: string,
  status: ThreadStatus,
  posts: PostType[]
}

export interface PostType {
  user: string,
  content: string,
  responseTo: string[],
  repliesTo: string[],
  id: string,
  status: PostStatus
}
