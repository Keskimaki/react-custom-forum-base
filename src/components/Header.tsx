import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles'

const Header = () => {
  return (
    <div style={styles.header}>
      <HeaderTab text="Forum" />
      <HeaderTab text="Login" />
    </div>
  )
}

const linkStyle = {
  textDecoration: 'inherit',
  color: 'inherit'
}

const HeaderTab = ({ text }: { text: string }) => {
  return (
    <div style={styles.headerTab}>
      <Link to={text} style={linkStyle}>
        {text}
      </Link>
    </div>
  )
}

export default Header