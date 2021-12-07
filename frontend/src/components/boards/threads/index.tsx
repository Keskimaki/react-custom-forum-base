import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThreadType } from '../../../types'
import styles from '../../../styles'
import { BoardType } from '../../../types'
import { RootState } from '../../../store'
import MakeThread from './MakeThread'

const Threads = () => {
  const { boardName } = useParams()
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)
  const board = boards.find(board => board.url === boardName)
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
      <MakeThread boardId={board.id} />
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
  )
}

export default Threads
