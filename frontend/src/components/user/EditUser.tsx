import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { RootState } from '../../store'
import { LoggedUser } from '../../types'
import userService from '../../services/users'
import styles from '../../styles'

const EditUser = () => {
  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const users = useSelector((state: RootState) => state.users)
  const user = users.find(user => user.username === loginData.username)
  const navigate = useNavigate()

  if (!user) return null

  const [name, setName] = useState(user.details?.name ? user.details.name : '')
  const [location, setLocation] = useState(user.details?.location ? user.details.location : '')
  const [description, setDescription] = useState(user.details?.description ? user.details.description : '')

  const handleProfileUpdating = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const details = {
      name,
      location,
      description      
    }
    userService.editUser({ details }, loginData.id, loginData.token)
    navigate('/user')
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
