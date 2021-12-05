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

export default loginReducer