import React from 'react'
import { useSelector } from 'react-redux'
import CSS from 'csstype'
import { RootState } from '../store'
import styles from '../styles'
import { NotificationType } from '../types'

const Notification = ()  => {
  const notification: NotificationType = useSelector((state: RootState) => state.notification )

  let style: CSS.Properties

  switch (notification.style) {
    case 'neutral':
      style = styles.notification
      break
    case 'positive':
      style = styles.positiveNotification
      break
    case 'negative':
      style = styles.negativeNotification
      break
    default: 
      return null
  }

  return (
    <>
      {notification.text && 
        <div style={style}>
          {notification.text}
        </div>}
    </>
  )
}

export default Notification