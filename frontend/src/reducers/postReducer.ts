import postService from '../services/posts'
import { PostExpanded } from '../types'
import { AppDispatch } from '../store'

interface PostAction {
  type: 'INIT_POSTS'
  data: PostExpanded[]
}

const postReducer = (state: PostExpanded[] = [], action: PostAction) => {
  switch (action.type) {
    case 'INIT_POSTS':
      return action.data
    default:
      return state
  }
}

export const initializePosts = () => {
  return async (dispatch: AppDispatch) => {
    const posts = await postService.getAll()
    dispatch({
      type: 'INIT_POSTS',
      data: posts
    })
  }
}

export default postReducer