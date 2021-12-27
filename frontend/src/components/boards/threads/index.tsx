import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import styles from '../../../styles'
import { BoardType } from '../../../types'
import { RootState } from '../../../store'
import Thread from './Thread'
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
