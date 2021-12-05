import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from '../styles'
import userService from '../services/users'
import { saveLoginData } from '../reducers/loginReducer'

const CreateAccount = () => {
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repeatPassword, setRepeatPassword ] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAccountCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (username.length >= 3 && password === repeatPassword) {
      await userService.createAccount(username, password, email)
      dispatch(saveLoginData(username, password))
      navigate('/boards')
    } else {
      console.log('incorrect input')
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