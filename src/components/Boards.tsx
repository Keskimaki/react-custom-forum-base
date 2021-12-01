import React from 'react'
import boards from '../mockdata/boards'

const Boards = () => {
  return (
    <div>
      <ul>
        {boards.map(board => 
          <li key={board.name}>
            {board.name} <br />
            {board.description} <br />
            number of threads: {board.threads.length}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Boards