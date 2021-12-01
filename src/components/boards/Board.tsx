import React from 'react'
import { BoardType } from '../../types'
import { Link } from 'react-router-dom'
import styles from '../../styles'

const Board = ({ board }: { board: BoardType }) => {
  return (
    <Link to={`/boards/${board.name}`} style={styles.link}>
      <div style={styles.board}>
        {board.name} <br />
        {board.description} <br />
        number of threads: {board.threads.length}
      </div>
    </Link>
  )
}

export default Board