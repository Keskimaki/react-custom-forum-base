import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import { logoutUser } from '../reducers/loginReducer'
import styles from '../styles'
import { LoggedUser } from '../types'

const Header = () => {
  const user: LoggedUser = useSelector((state: RootState)  => state.user)
  const loggedIn = user.privileges !== 'guest'

  return (
    <div style={styles.header}>
      <HeaderTab text="Forum" link="/boards" />
      {loggedIn 
        ? <>
          <HeaderTab text={user.username} link="/user" />
          <Logout />
        </>
        : <>
          <HeaderTab text="Login" link="/login" />
          <HeaderTab text="Create Account" link="/account" />
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