import React from 'react'
/*import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { ThreadType } from '../../types'
import styles from '../../styles'
import boards from '../../mockdata/boards'*/

const Threads = () => {
  /*const { boardName } = useParams()
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
  const { boardName } = useParams()

  return (
    <Link to={`/boards/${boardName}/${thread.name}`} style={styles.link}>
      <div style={styles.board}>
        <strong>{thread.name}</strong> <br />
        status: {thread.status} <br />
        posts: {thread.posts.length}
      </div>
    </Link>
  )*/
  return null
}

export default Threads
