import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import styles from '../styles'

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification )

  return (
    <>
      {notification && 
        <div style={styles.notification}>
          {notification}
        </div>}
    </>
  )
}

export default Notification