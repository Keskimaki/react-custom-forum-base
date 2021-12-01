export type privileges = 'admin' | 'mod' | 'user'

export interface User {
  username: string,
  posts: string[],
  following: string[],
  privileges: privileges
  details?: string //Expand later
  id: string
}
