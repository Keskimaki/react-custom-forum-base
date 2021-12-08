import express from 'express'
import Post from '../models/post'
import Thread from '../models/thread'
import User from '../models/user'
import getToken from '../utils/getToken'
import toNewPost from '../utils/parsers/toNewPost'
import { PostType } from '../types'

const postRouter = express.Router()

postRouter.get('/', async (_req, res) => {
  const posts = await Post.find({}).populate('thread')
  res.send(posts)
})

postRouter.post('/', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const newPost: PostType = toNewPost(req.body)
  const savedPost = await new Post(newPost).save()

  await Thread.findByIdAndUpdate(newPost.thread, { $push: { posts: savedPost.id } })
  await User.findByIdAndUpdate(newPost.user, { $push: { posts: savedPost.id } })
  for (let i = 0; i < newPost.responseTo.length; i++) {
    await Post.findByIdAndUpdate(newPost.responseTo[i], { $push: { repliesTo: savedPost.id } })
  } 
  res.status(201).json(savedPost)
})

postRouter.delete('/:id', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const post: any = await Post.findById(req.params.id)
  if (!post) {
    return res.status(400).json({ error: 'invalid id' })
  } else if (String(post.user) !== req.body.userId) {
    return res.status(401).json({ error: 'invalid user' })
  }
  await Thread.findByIdAndUpdate(post.thread, { $pull: { posts: post.id } })
  await User.findByIdAndUpdate(post.user, { $pull: { posts: post.id } })
  for (let i = 0; i < post.responseTo.length; i++) {
    await Post.findByIdAndUpdate(post.responseTo[i], { $pull: { repliesTo: post.id } })
  }
  await post.remove()
  res.status(204).end()
})

export default postRouter
