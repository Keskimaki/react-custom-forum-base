import loginService from '../services/login'
import { AppDispatch } from '../store'
import { Privileges, LoggedUser } from '../types'

interface LoginAction {
  type: 'SET_TOKEN' | 'RESET_USER',
  data: {
    token: string
    username: string
    privileges: Privileges
    id: string
  }
}

const loginReducer = (state: LoggedUser = {token: '', username: '', privileges: 'guest', id: ''}, action: LoginAction) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.data
    case 'RESET_USER':
      return {token: '', username: '', privileges: 'guest'}
    default:
      return state
  }
}

export const initializeUserData = (userData: string) => {
  return {
    type: 'SET_TOKEN',
    data: JSON.parse(userData)
  }
}

export const saveLoginData = (loginData: LoggedUser/*username: string, password: string*/) => {
  return async (dispatch: AppDispatch) => {
    /*const loginData: LoggedUser | undefined = await loginService.login(username, password)
    if (!loginData) {
      throw new Error('incorrect password')
    }*/
    window.localStorage.setItem(
      'loggedForumUser', JSON.stringify(loginData)
    )
    dispatch({
      type: 'SET_TOKEN',
      data: loginData
    })
  }
}

export const logoutUser = () => {
  return {
    type: 'RESET_USER'
  }
}

export default loginReducer
