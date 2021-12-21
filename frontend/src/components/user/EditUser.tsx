import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { RootState } from '../../store'
import { LoggedUser } from '../../types'
import userService from '../../services/users'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeUsers } from '../../reducers/userReducer'
import styles from '../../styles'

const EditUser = () => {
  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const users = useSelector((state: RootState) => state.users)
  const user = users.find(user => user.username === loginData.username)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) return null

  const [name, setName] = useState(user.details?.name ? user.details.name : '')
  const [email, setEmail] = useState(user.email ? user.email : '')
  const [location, setLocation] = useState(user.details?.location ? user.details.location : '')
  const [description, setDescription] = useState(user.details?.description ? user.details.description : '')

  const [changePassword, setChangePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleProfileUpdating = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (changePassword) {
      if (password.length < 5) {
        dispatch(setNotification('Password must be at least five characters long', 'negative'))
        return
      } else if (password !== repeatPassword) {
        dispatch(setNotification('Password and repeat do not match', 'negative'))
        return
      } else {
        await userService.editUser({ newPassword: password }, loginData.id, loginData.token)
        dispatch(initializeUsers())
        setChangePassword(false)
        dispatch(setNotification('Password updated', 'positive'))
        return
      }
    }

    const details = {
      name,
      location,
      description      
    }

    await userService.editUser({ details, email: email ? email: undefined }, loginData.id, loginData.token)
    dispatch(initializeUsers())
    navigate(`/${loginData.username}`)
    dispatch(setNotification('Profile updated', 'positive'))
  }

  if (changePassword) {
    return (
      <div style={styles.form}>
        <h1 style={styles.subHeader}>Change Password</h1>
        <form onSubmit={handleProfileUpdating}>
          <input
            required
            type="password"
            style={styles.textInput}
            placeholder="new password"
            value={password}
            onChange={({ target }) => setPassword(target.value) } />
          <br />
          <input 
            required
            type="password"
            style={styles.textInput}
            placeholder="repeat new password"
            value={repeatPassword}
            onChange={({ target }) => setRepeatPassword(target.value) } />
          <br />
          <button style={styles.button} type="submit">
            Update Password
          </button>
          <br />
          <button style={styles.button} onClick={() => setChangePassword(false)}>
            cancel
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={styles.edit}>
      <h1 style={styles.subHeader}>Edit Profile</h1>
      <br />
      <button style={styles.postButton} onClick={() => setChangePassword(true)}>
        change password
      </button>
      <form onSubmit={handleProfileUpdating}>
        <input 
          style={styles.textInput}
          placeholder="name"
          value={name}
          onChange={({ target }) => setName(target.value) } />
        <br />
        <input 
          style={styles.textInput}
          type="email"
          placeholder="email"
          value={email}
          onChange={({ target }) => setEmail(target.value) } />
        <br />
        <input 
          style={styles.textInput}
          placeholder="location"
          value={location}
          onChange={({ target }) => setLocation(target.value) } />
        <br />
        <textarea
          style={styles.textArea}
          placeholder="Tell about yourself"
          value={description}
          onChange={({ target }) => setDescription(target.value)} />
        <button style={styles.button} type="submit">
          Update profile
        </button>
        <> </>
        <Link to={`/${user.username}`}>
          <button style={styles.button}>
            cancel
          </button>
        </Link>
      </form>
    </div>
  )
}

export default EditUser
