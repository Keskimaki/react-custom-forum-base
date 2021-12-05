import loginService from '../services/login'
import { AppDispatch } from '../store'
import { Privileges } from '../types'

interface LoginAction {
  type: 'SET_TOKEN',
  data: {
    token: string,
    username: string,
    privileges: Privileges
  }
}

const loginReducer = (state = {}, action: LoginAction) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.data
    default:
      return state
  }
}

export const saveLoginData = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    const loginData = await loginService.login(username, password)
    window.localStorage.setItem(
      'loggedForumUser', JSON.stringify(loginData)
    )
    dispatch({
      type: 'SET_TOKEN',
      data: loginData
    })
  }
}

export default loginReducer