import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import styles from '../styles'

import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setNotification('placeholder'))
  }, [])

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