import { User } from "../types"

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

export default userReducer