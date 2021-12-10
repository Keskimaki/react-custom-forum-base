import axios from 'axios'
import { PostType } from '../types'

const baseUrl = 'http://localhost:3003/api/posts'

const makePost = async (content: string, responseTo: string[], user: string, thread: string, token: string) => {
  const newPost = {
    content,
    user,
    thread,
    responseTo
  }
  const res = await axios.post<PostType>(baseUrl, newPost, { headers: { Authorization: token } })
  return res.data
}

const deletePost = async (postId: string, userId: string, token: string) => {
  const res = await axios.delete<PostType>(`${baseUrl}/${postId}`, { headers: { Authorization: token }, data: { userId } } )
  return res.data
}

const postService = {
  makePost,
  deletePost
}

export default postService