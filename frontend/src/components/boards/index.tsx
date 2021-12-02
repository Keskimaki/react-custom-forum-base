import React from 'react'
import { BoardType } from '../../types'
import { Link } from 'react-router-dom'
import styles from '../../styles'
import boards from '../../mockdata/boards'


const Boards = () => {
  return (
    <div>
      {boards.map(board => 
        <Board key={board.name} board={board}/>
      )}
    </div>
  )
}

const Board = ({ board }: { board: BoardType }) => {
  return (
    <Link to={`/boards/${board.name}`} style={styles.link}>
      <div style={styles.board}>
        <strong>{board.name}</strong> <br />
        {board.description} <br />
        number of threads: {board.threads.length}
      </div>
    </Link>
  )
}

export default Boards