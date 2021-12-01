import React, { useState } from 'react'
import styles from '../styles'
import users from '../mockdata/users' //placeholder until backend functional

const Login = () => {
  const [ username, setUsername] = useState('')
  const [ password, setPassword] = useState('')

  const handleLogin = (event: React.SyntheticEvent) => {
    event.preventDefault()
    //TODO authentication in backend
    const user = users.find(user => user.username === username)
    user && password === 'salasana'
      ? console.log('logged in')
      : console.log('incorrect username or password')
  }

  return (
    <div style={styles.login}>
      <form onSubmit={handleLogin}>
        <input
          style={styles.textInput}
          value={username}
          onChange={({ target }) => setUsername(target.value) } />
        <br />
        <input
          style={styles.textInput}
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value) } />
        <br />
        <button style={styles.button} type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login