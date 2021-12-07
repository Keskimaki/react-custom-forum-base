import { ObjectId } from 'mongodb'

export type Privileges = 'admin' | 'mod' | 'user' | 'guest'

export type BoardStatus = 'open' | 'closed'

export type ThreadStatus = 'open' | 'closed' | 'removed' | 'waiting'

export type PostStatus = 'visible' | 'removed' | 'deleted' | 'waiting'

export interface UserType {
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
  url: string,
  threads: ThreadType[],
  id: ObjectId
}

export interface ThreadType {
  name: string,
  description: string,
  user: ObjectId,
  date: Date,
  status: ThreadStatus,
  board: ObjectId,
  posts: PostType[],
  id: ObjectId
}

export interface PostType {
  user: ObjectId,
  content: string,
  date: Date,
  responseTo: ObjectId[],
  repliesTo: ObjectId[],
  status: PostStatus,
  thread: ObjectId,
  id: ObjectId
}
