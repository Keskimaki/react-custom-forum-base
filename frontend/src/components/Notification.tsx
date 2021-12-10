import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'

import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setNotification('placeholder'))
  }, [])

  return (
    <div>
      {notification}
    </div>
  )
}

export default Notification