import React, { useState } from 'react'
import styles from '../styles'
import loginService from '../services/login'
//import users from '../mockdata/users' //placeholder until backend functional

const Login = () => {
  const [ username, setUsername] = useState('')
  const [ password, setPassword] = useState('')

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await loginService.login(username, password)
    console.log(res)
  }

  return (
    <div style={styles.login}>
      <form onSubmit={handleLogin}>
        <input
          required
          style={styles.textInput}
          placeholder="username"
          value={username}
          onChange={({ target }) => setUsername(target.value) } />
        <br />
        <input
          required
          style={styles.textInput}
          type="password"
          placeholder="password"
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
