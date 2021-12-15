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

  const handleProfileUpdating = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const details = {
      name,
      location,
      description      
    }
    await userService.editUser({ details, email: email ? email: undefined }, loginData.id, loginData.token)
    dispatch(initializeUsers())
    navigate('/user')
    dispatch(setNotification('Profile updated', 'positive'))
  }

  return (
    <div>
      <h1 style={{ margin: 0 }}>Editing profile</h1>
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
        <Link to="/user">
          <button style={styles.button}>
            cancel
          </button>
        </Link>
      </form>
    </div>
  )
}

export default EditUser
