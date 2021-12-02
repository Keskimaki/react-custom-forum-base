export type Privileges = 'admin' | 'mod' | 'user'

export type Status = 'open' | 'closed' | 'removed' | 'waiting'  

export interface ThreadType {
  name: string,
  status: Status,
  posts: string[]
}

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
