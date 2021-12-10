import { AppDispatch } from "../store"

type Style = 'neutral' | 'positive' | 'negative'

interface NotificationAction {
  type: 'SET_NOTIFICATION' | 'RESET_NOTIFICATION'
  data?: {
    text: string,
    style: Style
  }
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

export const setNotification = (text: string, style: Style = 'neutral', time = 5) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        text,
        style
      }
    })
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

export default notificationReducer