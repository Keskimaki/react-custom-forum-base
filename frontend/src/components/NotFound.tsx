import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div style={styles.form}>
      <h1>404 - Not Found</h1>
      <button onClick={() => navigate(-1)} style={styles.button}>
        Go Back
      </button>
    </div>
  )
}

export default NotFound