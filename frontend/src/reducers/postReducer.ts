import postService from '../services/posts'
import { PostType } from '../types'
import { AppDispatch } from '../store'

interface PostAction {
  type: 'INIT_POSTS'
  data: PostType[]
}

const postReducer = (state: PostType[] = [], action: PostAction) => {
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