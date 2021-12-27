import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import styles from '../styles'

const Search = () => {
  const [filter, setFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')

  return (
    <div>
      <div style={styles.form}>
        <h1 style={styles.subHeader}>Search Forum</h1>
        <input
          style={styles.textInput} 
          placeholder="title search"
          value={filter}
          onChange={({ target }) => setFilter(target.value)} />
        <input
          style={styles.textInput} 
          placeholder="user search"
          value={userFilter}
          onChange={({ target }) => setUserFilter(target.value)} />
      </div>
      <SearchResults
        filter={filter}
        userFilter={userFilter} />
    </div>
  )
}

const SearchResults = ({ filter, userFilter }: { filter: string, userFilter: string }) => {
  const boards = useSelector((state: RootState) => state.boards)
  const users = useSelector((state: RootState) => state.users)
  const threads = boards.map(board => board.threads).flat()

  if (!filter && !userFilter) return null

  //Filter by thread title
  let filteredThreads = threads.
    filter(thread => thread.name.toLowerCase().
    includes(filter.toLowerCase()))

  //Filter by user
  if (userFilter) {
    filteredThreads = filteredThreads.
      filter(thread => users.find(user => user.id === thread.user)?.username === userFilter)
  }  

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
          </div>
        </Link>)}
    </div>
  )
}

export default Search