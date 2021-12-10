interface NotificationAction {
  type: 'SET_NOTIFICATION'
  data: {
    notification: string
  }
}

const notificationReducer = (state = '', action: NotificationAction) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotification = (notification: string) => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification
  }
}

export default notificationReducer