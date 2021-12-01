import React from 'react'
import boards from '../../mockdata/boards'
import Board from './Board'

const Boards = () => {
  return (
    <div>
      {boards.map(board => 
        <Board key={board.name} board={board}/>
      )}
    </div>
  )
}

export default Boards