export type Privileges = 'admin' | 'mod' | 'user' | 'guest'

export type BoardStatus = 'open' | 'closed'

export type ThreadStatus = 'open' | 'closed' | 'removed' | 'waiting'

export type PostStatus = 'visible' | 'removed' | 'deleted' | 'waiting'

export interface LoggedUser {
  token: string,
  username: string,
  privileges: Privileges,
  id: string
}

export interface User {
  username: string,
  email?: string,
  date: Date,
  posts: string[],
  following: string[],
  privileges: Privileges
  details?: string //Expand later
  id: string
}

export interface BoardType {
  name: string,
  description: string,
  status: BoardStatus,
  url: string,
  threads: ThreadType[]
}

export interface ThreadType {
  name: string,
  user: string,
  date: Date,
  status: ThreadStatus,
  posts: PostType[],
  id: string
}

export interface PostType {
  user: string,
  content: string,
  date: Date,
  responseTo: string[],
  repliesTo: string[],
  status: PostStatus,
  id: string
}
