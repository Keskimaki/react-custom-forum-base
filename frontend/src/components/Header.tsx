import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import styles from '../styles'
import { LoggedUser } from '../types'

const Header = () => {
  const user: LoggedUser = useSelector((state: RootState)  => state.user)

  return (
    <div style={styles.header}>
      <HeaderTab text="Forum" link="/boards" />
      {user.privileges === 'guest' 
        ? <>
          <HeaderTab text="Login" link="/login" />
          <HeaderTab text="Create Account" link="/account" />
        </>
        : <>
          <HeaderTab text={user.username} link={`/${user.username}`} />
          <Logout />
        </>}
    </div>
  )
}

const HeaderTab = ({ text, link }: { text: string, link: string }) => {
  return (
    <div style={styles.headerTab}>
      <Link to={link} style={styles.link}>
        {text}
      </Link>
    </div>
  )
}

const Logout = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedForumUser')
    dispatch(logoutUser())
    dispatch(setNotification('Logged out', 'neutral'))
  }

  return (
    <div style={styles.headerTab} onClick={handleLogout}>
      <Link to="/boards" style={styles.link}>
        Logout
      </Link>
    </div>
  )
}

export default Header