import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BoardType } from '../../types'
import { RootState } from '../../store'
import styles from '../../styles'

const Boards = () => {
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)

  return (
    <div>
      {boards.map(board => 
        <Board key={board.url} board={board}/>
      )}
    </div>
  )
}

const Board = ({ board }: { board: BoardType }) => {
  return (
    <Link to={`/boards/${board.url}`} style={styles.link}>
      <div style={styles.board}>
        <strong>{board.name}</strong>
        <br />
        {board.description} 
        <br />
        number of threads: {board.threads.length}
      </div>
    </Link>
  )
}

export default Boards