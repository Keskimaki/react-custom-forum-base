//For now just copy of Frontend

export type Privileges = 'admin' | 'mod' | 'user'

export type ThreadStatus = 'open' | 'closed' | 'removed' | 'waiting'

export type PostStatus = 'visible' | 'removed' | 'deleted' | 'waiting'

export interface User {
  username: string,
  posts: string[],
  following: string[],
  privileges: Privileges
  details?: string //Expand later
  id: string
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
