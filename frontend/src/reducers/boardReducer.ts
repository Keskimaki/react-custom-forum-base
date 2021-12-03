import boardService from '../services/boards'
import { BoardType } from '../types'
import { AppDispatch } from '../store'

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

export const getBoards = () => {
  return async (dispatch: AppDispatch) => {
    const boards = await boardService.getAll()
    dispatch({
      type: 'GET_BOARDS',
      data: boards
    })
  }
}

export default boardReducer