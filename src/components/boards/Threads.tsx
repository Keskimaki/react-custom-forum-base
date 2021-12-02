import React from 'react'
import { useParams } from 'react-router'
import boards from '../../mockdata/boards'
import { ThreadType } from '../../types'
import styles from '../../styles'

const Threads = () => {
  const { boardName } = useParams()
  const board = boards.find(board => board.name === boardName)
  //TODO redirect to 404
  if (!board) {
    return null
  }

  return (
    <div>
      <h1>{board.name}</h1>
      {board.threads.map(thread => 
        <Thread key={thread.name} thread={thread} />
      )}
    </div>
  )
}

const Thread = ({ thread }: { thread: ThreadType }) => {
  return (
    <div style={styles.board}>
      <strong>{thread.name}</strong> <br />
      status: {thread.status} <br />
      posts: {thread.posts.length}
    </div>
  )
}

export default Threads
