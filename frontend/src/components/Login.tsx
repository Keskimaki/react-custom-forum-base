import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from '../styles'
import { saveLoginData } from '../reducers/loginReducer'

const Login = () => {
  const [ username, setUsername] = useState('')
  const [ password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(saveLoginData(username, password))
    navigate('/boards')
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
