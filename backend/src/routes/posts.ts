import express from 'express'
import Post from '../models/post'
import Thread from '../models/thread'
import User from '../models/user'
import getToken from '../utils/getToken'
import toNewPost from '../utils/parsers/toNewPost'
import { PostType } from '../types'

const postRouter = express.Router()

postRouter.get('/', async (_req, res) => {
  const posts: PostType[] = await Post.find({}).populate('thread')
  res.send(posts)
})

postRouter.post('/', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const newPost: PostType = toNewPost(req.body)
  const savedPost: PostType = await new Post(newPost).save()

  await Thread.findByIdAndUpdate(newPost.thread, { $push: { posts: savedPost.id } })
  await User.findByIdAndUpdate(newPost.user, { $push: { posts: savedPost.id } })
  for (let i = 0; i < newPost.responseTo.length; i++) {
    await Post.findByIdAndUpdate(newPost.responseTo[i], { $push: { repliesTo: savedPost.id } })
  } 
  res.status(201).json(savedPost)
})

postRouter.put('/:id', async (req, res) => {
  //TODO parse edit data, update replies in database if edited
  if (!getToken(req.get('authorization'))) {
    console.log(req.body)
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const post: PostType | null = await Post.findById(req.params.id)
  console.log(req.params.id)
  if (!post) {
    console.log('hei')
    console.log(req.body)
    return res.status(400).json({ error: 'invalid id' })
  } else if (String(post.user) !== req.body.userId) {
    console.log('juu')
    return res.status(401).json({ error: 'invalid user' })
  }
  await Post.findByIdAndUpdate(req.params.id, req.body)
  res.status(204).end()
})

postRouter.delete('/:id', async (req, res) => {
  console.log(req.body)
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const post: PostType | null = await Post.findById(req.params.id)
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
  await Post.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default postRouter
