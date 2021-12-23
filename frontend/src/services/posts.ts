import axios from 'axios'
import env from '../.env'
import { PostType } from '../types'

const baseUrl = `${env.API_BASE_URL}/api/posts`

const getAll = async () => {
  const res = await axios.get<PostType[]>(baseUrl)
  return res.data
}

const makePost = async (imageUrl: string, content: string, user: string, thread: string, token: string, responseTo : string[] = []) => {
  const newPost = {
    imageUrl,
    content,
    user,
    thread,
    responseTo
  }
  const res = await axios.post<PostType>(baseUrl, newPost, { headers: { Authorization: token } })
  return res.data
}

const editPost = async (imageUrl: string, content: string, responseTo: string[], postId: string, userId: string, token: string) => {
  const editData = {
    imageUrl,
    content,
    responseTo,
    userId
  }
  await axios.put(`${baseUrl}/${postId}`, editData, { headers: { Authorization: token } })
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