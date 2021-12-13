import userService from '../services/users'
import { UserType } from '../types'
import { AppDispatch } from '../store'

interface UserAction {
  type: 'INIT_USERS'
  data: UserType[]
}

const userReducer = (state: UserType[] = [], action: UserAction) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async (dispatch: AppDispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userReducer