import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from '../styles'
import userService from '../services/users'
import { saveLoginData } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

import { LoggedUser } from '../types'
import loginService from '../services/login'

const CreateAccount = () => {
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repeatPassword, setRepeatPassword ] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAccountCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (username.length < 3) {
      dispatch(setNotification('Username must be at least three characters long'))
    } else if (password.length < 5) {
      dispatch(setNotification('Password must be at least five characters long'))
    } else if (password !== repeatPassword) {
      dispatch(setNotification('Password and repeat do not match'))
    } else {
      await userService.createAccount(username, password, email)
      const loginData = await loginService.login(username, password)
      if (!loginData) {
        //Only here because of TypeScript complaining
        return null
      } 
      dispatch(saveLoginData(loginData))
      navigate('/boards')
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