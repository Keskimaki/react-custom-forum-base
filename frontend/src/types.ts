export type Privileges = 'admin' | 'mod' | 'user' | 'guest'

export type BoardStatus = 'open' | 'closed'

export type ThreadStatus = 'open' | 'closed' | 'removed' | 'waiting'

export type PostStatus = 'visible' | 'removed' | 'deleted' | 'waiting'

export interface UserDetails {
  name?: string
  location?: string
  description?: string
}

export interface LoggedUser {
  token: string,
  username: string,
  privileges: Privileges,
  id: string
}

export interface UserType {
  username: string,
  email?: string,
  date: Date,
  posts: PostType[],
  following: string[],
  privileges: Privileges
  image?: URL,
  details?: UserDetails
  id: string
}

export interface BoardType {
  name: string,
  description: string,
  status: BoardStatus,
  url: string,
  threads: ThreadType[],
  id: string
}

export interface ThreadType {
  name: string,
  description?: string, //Delete?
  user: string,
  date: Date,
  status: ThreadStatus,
  board: string,
  posts: PostType[],
  id: string
}

interface PostBase {
  user: string,
  content: string,
  date: Date,
  edited?: Date,
  responseTo: string[],
  repliesTo: string[],
  status: PostStatus,
  image?: URL
  id: string
}

export interface PostType extends PostBase {
  thread: string
}

export interface PostExpanded extends PostBase {
  thread: ThreadType
}

export interface NotificationType {
  text: string
  style: 'neutral' | 'positive' | 'negative'
}
