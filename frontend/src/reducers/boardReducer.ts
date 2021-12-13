import boardService from '../services/boards'
import { BoardType } from '../types'
import { AppDispatch } from '../store'

interface BoardAction {
  type: 'INIT_BOARDS' | 'ADD_POST'
  data: BoardType[]
}

const boardReducer = (state: BoardType[] = [], action: BoardAction) => {
  switch (action.type) {
    case 'INIT_BOARDS':
      return action.data
    default:
      return state
  }
}

export const initializeBoards = () => {
  return async (dispatch: AppDispatch) => {
    const boards = await boardService.getAll()
    dispatch({
      type: 'INIT_BOARDS',
      data: boards
    })
  }
}

export default boardReducer
