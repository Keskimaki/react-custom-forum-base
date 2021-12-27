import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from '../styles'
import userService from '../services/users'
import { saveLoginData } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/userReducer'
import loginService from '../services/login'
import { RootState } from '../store'
import { LoggedUser } from '../types'

const CreateAccount = () => {
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repeatPassword, setRepeatPassword ] = useState('')

  const users = useSelector((state: RootState) => state.users)
  const usernames = users.map(user => user.username)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAccountCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (username.length < 3) {
      dispatch(setNotification('Username must be at least three characters long', 'negative'))
    } else if (usernames.some(name => name === username)) {
      dispatch(setNotification('Username already taken', 'negative'))
    } else if (password.length < 5) {
      dispatch(setNotification('Password must be at least five characters long', 'negative'))
    } else if (password !== repeatPassword) {
      dispatch(setNotification('Password and repeat do not match', 'negative'))
    } else {
      await userService.createAccount(username, password, email)
      const loginData = await loginService.login(username, password)

      dispatch(saveLoginData(loginData as LoggedUser)) //Never undefined, account just created
      dispatch(initializeUsers())
      navigate('/boards')
      dispatch(setNotification('Account created', 'positive'))
    }
  }

  return (
    <div style={styles.form}>
      <h1 style={styles.subHeader}>Create Account</h1>
      <form onSubmit={handleAccountCreation}>
        <input
          required
          style={styles.textInput}
          placeholder="username"
          value={username}
          onChange={({ target }) => setUsername(target.value) } />
        <br />
        <input
          style={styles.textInput}
          type="email"
          placeholder="email (optional)"
          value={email}
          onChange={({ target }) => setEmail(target.value) } />
        <br />
        <input
          required
          style={styles.textInput}
          type="password"
          placeholder="password"
          value={password}
          onChange={({ target }) => setPassword(target.value) } />
        <br />
        <input
          required
          style={styles.textInput}
          type="password"
          placeholder="repeat password"
          value={repeatPassword}
          onChange={({ target }) => setRepeatPassword(target.value) } />
        <br />
        <button style={styles.button} type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default CreateAccount