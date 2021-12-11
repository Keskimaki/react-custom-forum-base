import boardService from '../services/boards'
import { BoardType } from '../types'
import { AppDispatch } from '../store'
//import postService from '../services/posts'

interface BoardAction {
  type: 'INIT_BOARDS' | 'ADD_POST'
  data: BoardType[]
}

const boardReducer = (state: BoardType[] = [], action: BoardAction) => {
  switch (action.type) {
    case 'INIT_BOARDS':
      return action.data
    /*case 'ADD_POST':
      state.find(board => board.threads.some(thread => thread.id === action.data.thread))?.threads.find(thread => thread.id === action.data.thread)?.posts.concat(action.data)
      return state*/
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

/*export const addPost = (comment: string, responseTo: string[], userId: string, threadId: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    const post = await postService.makePost(comment, responseTo, userId, threadId, token)
    dispatch({
      type: 'ADD_POST',
      data: post
    })
  }
}*/

export default boardReducer
