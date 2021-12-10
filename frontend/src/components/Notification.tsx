import React from 'react'
import { useSelector } from 'react-redux'
import CSS from 'csstype'
import { RootState } from '../store'
import styles from '../styles'

const Notification = ({ type = 'neutral' }: { type?: string })  => {
  const notification = useSelector((state: RootState) => state.notification )

  let style: CSS.Properties

  switch (type) {
    case 'neutral':
      style = styles.notification
      break
    case 'negative':
      style = styles.negativeNotification
      break
    case 'positive':
      style = styles.positiveNotification
      break
    default: 
      return null
  }

  return (
    <>
      {notification && 
        <div style={style}>
          {notification}
        </div>}
    </>
  )
}

export default Notification