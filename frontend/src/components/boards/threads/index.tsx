import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThreadType } from '../../../types'
import styles from '../../../styles'
import { BoardType, UserType, PostType } from '../../../types'
import { RootState } from '../../../store'
import MakeThread from './MakeThread'
import NotFound from '../../NotFound'

const Threads = () => {
  const { boardName } = useParams()
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)
  const board = boards.find(board => board.url === boardName)
  const [page, setPage] = useState(0)

  if (!board) return <NotFound />
  
  //Sort threads by date of latest post
  board.threads.sort((a, b) => +new Date(b.posts[b.posts.length - 1].date) - +new Date(a.posts[a.posts.length - 1].date))

  return (
    <div>
      <h1 style={styles.subHeader}>{board.name}</h1>
      <div style={{ marginTop: '10px' }}>
        <PageButtons 
          page={page}
          setPage={setPage}
          threads={board.threads.length} />
        {board.threads.slice(20 * page, 20 + 20 * page).map(thread => 
          <Thread key={thread.name} thread={thread} />
        )}
        <PageButtons 
          page={page}
          setPage={setPage}
          threads={board.threads.length} />
        <MakeThread boardId={board.id} />
      </div>
    </div>
  )
}

const Thread = ({ thread }: { thread: ThreadType }) => {
  const { boardName } = useParams()
  const users = useSelector((state: RootState) => state.users)
  const username = users.find(user => user.id === thread.user)?.username
  
  let lastPoster: UserType | undefined
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
              ? <>{lastPost.content.substring(0, 20)}...</>
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

const PageButtons = ({ page, setPage, threads }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>>, threads: number }) => {
  if (threads < 21) return null

  const changePage = (i: number) => {
    setPage(i)
    window.scrollTo(0, 0)
  }

  const buttons = []
  for (let i = 0; i < Math.ceil(threads / 20); i++) {
    buttons.push(
      <button key={i} onClick={() => changePage(i)} style={page === i ? styles.postButtonFocus : styles.postButton}>
        {i + 1}
      </button>)
  }
  
  return (
    <div style={styles.board}>
      {buttons}
      {page != Math.ceil(threads / 20) - 1 &&
        <button onClick={() => changePage(page + 1)} style={styles.postButton}>
          next
        </button>}
    </div>
  )
}

export default Threads
