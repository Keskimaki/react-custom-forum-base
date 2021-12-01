import React from 'react'
import styles from '../styles'

const Header = () => {
  return (
    <div style={styles.header}>
      <HeaderTab text="Placeholder" />
      <HeaderTab text="content" />
      <HeaderTab text="for" />
      <HeaderTab text="the" />
      <HeaderTab text="time" />
      <HeaderTab text="being" />
    </div>
  )
}

const HeaderTab = ({ text }: { text: string }) => {
  return (
    <div style={styles.headerTab}>
      {text}
    </div>
  )
}

export default Header