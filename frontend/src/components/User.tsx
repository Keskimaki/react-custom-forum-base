import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { LoggedUser, UserType } from '../types'
import styles from '../styles'

const User = () => {
  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const users: UserType[] = useSelector((state: RootState) => state.users)

  const boards = useSelector((state: RootState) => state.boards)
  const threads = boards.map(board => board.threads).flat()

  const user = users.find(user => user.username === loginData.username)
  if (!user || user.username === "") {
    return null
  }

  const findThread = (threadId: string) => {
    const thread = threads.find(thread => thread.id === threadId)
    if (!thread) {
      return null
    }
    const boardName = boards.find(board => board.id === thread?.board)?.name
    return <><strong>{thread.name}</strong> in {boardName}</>
  }

  return (
    <div>
      <div style={styles.board}>
        <h1 style={styles.subHeader}>{user.username} </h1>
        {user.privileges}
        <br />
        {user.email}
        <br />
        {user.details /*TODO*/}
        {user.following /*TODO*/}
      </div>
      <h2 style={styles.subHeader}>Posts: </h2>
      {user.posts.reverse().map(post => 
        <div key={post.id} style={styles.board}>
          {findThread(post.thread)}
          <br />
          {post.content}
        </div>)}
    </div>
  )
}

export default User