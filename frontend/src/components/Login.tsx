import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import loginService from '../services/login'
import styles from '../styles'
import { saveLoginData } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { RootState } from '../store'
import { User, LoggedUser } from '../types'

const Login = () => {
  const [ username, setUsername] = useState('')
  const [ password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const users: User[] = useSelector((state: RootState) => (state.users))
  const usernames = users.map(user => user.username)

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (usernames.some(name => name === username)) {
      const loginData: LoggedUser | undefined = await loginService.login(username, password)
      if (!loginData) {
        dispatch(setNotification('Incorrect password'))
      } else {
        dispatch(saveLoginData(loginData))
        navigate('/boards')
      }
    } else {
      dispatch(setNotification('Username not found'))
    }
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
