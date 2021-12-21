import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import styles from '../styles'

const Search = () => {
  const [filter, setFilter] = useState('')

  return (
    <div>
      <h1 style={styles.subHeader}>Search Forum:</h1>
      <br />
      <input
        style={styles.textInput} 
        placeholder="search"
        value={filter}
        onChange={({ target }) => setFilter(target.value)} />
      <SearchResults filter={filter} />
    </div>
  )
}

const SearchResults = ({ filter }: { filter: string }) => {
  const boards = useSelector((state: RootState) => state.boards)
  const users = useSelector((state: RootState) => state.users)

  const threads = boards.map(board => board.threads).flat()
  const filteredThreads = threads.filter(thread => thread.name.toLowerCase().includes(filter.toLowerCase()))

  //if (!filter) return null

  return (
    <div style={{ marginTop: '10px' }}>
      {filteredThreads.map(thread => 
        <Link
          to={`/boards/${boards.find(board => board.id === thread.board)?.url}/${thread.name}`}
          style={styles.link}
          key={thread.id}>
          <div style={styles.board}>
            <strong>{boards.find(board => board.id === thread.board)?.name}</strong>
            <br />
            {thread.name} by
            <strong> {users.find(user => user.id === thread.user)?.username}</strong>
            <span style={styles.threadInfo}>{thread.posts.length} posts</span>
          </div>
        </Link>)}
    </div>
  )
} 

export default Search