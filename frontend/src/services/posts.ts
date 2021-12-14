import axios from 'axios'
import { PostType, PostExpanded } from '../types'

const baseUrl = 'http://localhost:3003/api/posts'

const getAll = async () => {
  const res = await axios.get<PostExpanded[]>(baseUrl)
  return res.data
}

const makePost = async (content: string, user: string, thread: string, token: string, responseTo : string[] = []) => {
  const newPost = {
    content,
    user,
    thread,
    responseTo
  }
  const res = await axios.post<PostType>(baseUrl, newPost, { headers: { Authorization: token } })
  return res.data
}

const editPost = async (content: string, responseTo: string[], postId: string, userId: string, token: string) => {
  await axios.put(`${baseUrl}/${postId}`, { content, responseTo, userId }, { headers: { Authorization: token } })
}

const deletePost = async (postId: string, userId: string, token: string) => {
  await axios.delete<PostType>(`${baseUrl}/${postId}`, { headers: { Authorization: token }, data: { userId } })
}

const postService = {
  getAll,
  makePost,
  editPost,
  deletePost
}

export default postService