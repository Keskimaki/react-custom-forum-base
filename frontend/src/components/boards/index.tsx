import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BoardType } from '../../types'
import boardService from '../../services/boards'
import styles from '../../styles'

const Boards = () => {
  const [ boards, setBoards ] = useState<BoardType[]>([])
  useEffect(() => {
    boardService.getAll(setBoards)
  }, [])

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