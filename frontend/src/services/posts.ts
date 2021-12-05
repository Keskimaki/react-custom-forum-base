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

const postService = {
  makePost
}

export default postService