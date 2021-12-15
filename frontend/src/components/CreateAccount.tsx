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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const loginData: any = await loginService.login(username, password) //Will alway be LoggedUser and never undefined since the account is just created
      dispatch(saveLoginData(loginData))
      dispatch(initializeUsers())
      navigate('/boards')
      dispatch(setNotification('Account created', 'positive'))
    }
  }

  return (
    <div style={styles.login}>
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
          Create Account
        </button>
      </form>
    </div>
  )
}

export default CreateAccount