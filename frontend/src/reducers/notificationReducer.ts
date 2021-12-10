import { AppDispatch } from "../store"

interface NotificationAction {
  type: 'SET_NOTIFICATION' | 'RESET_NOTIFICATION'
  data?: string
}

const notificationReducer = (state = '', action: NotificationAction) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const resetNotification = (): NotificationAction => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

let timeout: NodeJS.Timeout

export const setNotification = (notification: string, time = 5) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

export default notificationReducer