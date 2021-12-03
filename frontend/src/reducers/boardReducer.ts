//import axios, { AxiosResponse } from 'axios'
import { BoardType } from '../types'

interface BoardAction {
  type: 'GET_BOARDS',
  data: BoardType[]
}

const boardReducer = (state: BoardType[] = [], action: BoardAction) => {
  switch (action.type) {
    case 'GET_BOARDS':
      return action.data
    default:
      return state
  }
}

/*const getBoards = () => {
  return async dispatch => {
    const boards = await axios.get('http://localhost:3003/api/boards')
    const boardsData: BoardType[] = boards.data
    dispatch({
      type: 'GET_BOARDS',
      data: boardsData
    })
  }
}*/

export default boardReducer