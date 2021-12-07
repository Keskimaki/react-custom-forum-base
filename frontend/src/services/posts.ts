import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/posts'

const makePost = async (content: string, user: string, thread: string) => {
  const newPost = {
    content,
    user,
    thread,
    responseTo: [],
    status: 'visible'
  }
  const res = await axios.post(baseUrl, newPost)
  return res.data
}

const deletePost = async (postId: string, userId: string, token: string) => {
  const res = await axios.delete(`${baseUrl}/${postId}`, { headers: { Authorization: `bearer ${token}` }, data: { userId } } )
  return res.data
}

const postService = {
  makePost,
  deletePost
}

export default postService