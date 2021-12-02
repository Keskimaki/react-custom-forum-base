import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles'

const Header = () => {
  return (
    <div style={styles.header}>
      <HeaderTab text="Forum" link="/boards" />
      <HeaderTab text="Login" link="/login" />
      <HeaderTab text="Create Account" link="/account" />
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

export default Header