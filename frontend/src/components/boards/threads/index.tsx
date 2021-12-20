import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThreadType } from '../../../types'
import styles from '../../../styles'
import { BoardType, UserType, PostType } from '../../../types'
import { RootState } from '../../../store'
import MakeThread from './MakeThread'

const Threads = () => {
  const { boardName } = useParams()
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)
  const board = boards.find(board => board.url === boardName)
  //TODO redirect to 404
  if (!board) return null

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
  const users = useSelector((state: RootState) => state.users)
  const username = users.find(user => user.id === thread.user)?.username
  
  let lastPoster: any//UserType | undefined
  let lastPost: PostType | undefined
  if (thread.posts.length > 0) {
    lastPoster = users.find(user => user.id === thread.posts[thread.posts.length - 1].user)
    lastPost  = thread.posts[thread.posts.length - 1]
  }

  return (
    <Link to={`/boards/${boardName}/${thread.name}`} style={styles.link}>
      <div style={styles.board}>
        {lastPoster && lastPost &&
          <div style={styles.threadInfo}>
            Last post by {lastPoster.username}
            <br />
            {lastPost.content.length > 20
              ? <>{lastPost.content.substring(0, 20)}</>
              : lastPost.content}
            <br />
            at {new Date(thread.posts[thread.posts.length - 1].date)
              .toLocaleString('ger', { day: 'numeric', month: 'numeric', year: '2-digit', hour: 'numeric', minute:'numeric', second:'numeric' })}
          </div>}
        <strong>{thread.name}</strong> <br />
        created by {username ? username : <>deleted</>} <br />
        posts: {thread.posts.length}
      </div>
    </Link>
  )
}

export default Threads
