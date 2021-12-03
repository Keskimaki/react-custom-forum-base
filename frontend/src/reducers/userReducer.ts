import userService from '../services/users'
import { User } from '../types'
import { AppDispatch } from '../store'

interface UserAction {
  type: 'INIT_USERS',
  data: User[]
}
const userReducer = (state: User[] = [], action: UserAction) => {
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