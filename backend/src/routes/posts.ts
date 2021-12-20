import express from 'express'
import { ObjectId } from 'mongodb'
import Post from '../models/post'
import Thread from '../models/thread'
import User from '../models/user'
import getToken from '../utils/getToken'
import toNewPost, { toEditPost, handleImage } from '../utils/parsers/toNewPost'
import { PostType } from '../types'

const postRouter = express.Router()

postRouter.get('/', async (_req, res) => {
  const posts: PostType[] = await Post.find({})//.populate('thread')
  res.send(posts)
})

postRouter.post('/', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const newPost: PostType = toNewPost(req.body)
  const savedPost: PostType = await new Post(newPost).save()

  if (req.body.imageUrl) {
    await handleImage(req.body.imageUrl, savedPost.id as ObjectId)
    await Post.findByIdAndUpdate(savedPost.id, { image: true })
  }
  await Thread.findByIdAndUpdate(newPost.thread, { $push: { posts: savedPost.id } })
  await User.findByIdAndUpdate(newPost.user, { $push: { posts: savedPost.id } })
  for (let i = 0; i < newPost.responseTo.length; i++) {
    await Post.findByIdAndUpdate(newPost.responseTo[i], { $push: { repliesTo: savedPost.id } })
  } 
  res.status(201).json(savedPost)
})

postRouter.put('/:id', async (req, res) => {
  if (!getToken(req.get('authorization'))) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const post: PostType | null = await Post.findById(req.params.id)
  if (!post) {
    return res.status(400).json({ error: 'invalid id' })
  } else if (String(post.user) !== req.body.userId) {
    return res.status(401).json({ error: 'invalid user' })
  }
  const editData = toEditPost(req.body)
  if (req.body.imageUrl) {
    await handleImage(req.body.imageUrl, post.id as ObjectId)
    await Post.findByIdAndUpdate(req.params.id, { image: true })
  }
  if (editData.responseTo && post.responseTo !== editData.responseTo) {
    for (let i = 0; i < post.responseTo.length; i++) {
      await Post.findByIdAndUpdate(post.responseTo[i], { $pull: { repliesTo: post.id } })
    }
    for (let i = 0; i < editData.responseTo.length; i++) {
      await Post.findByIdAndUpdate(editData.responseTo[i], { $push: { repliesTo: post.id } })
    }
    await Post.findByIdAndUpdate(req.params.id, { $set: { responseTo: editData.responseTo } })
  }
  await Post.findByIdAndUpdate(req.params.id, editData)
  res.status(204).end()
})

postRouter.delete('/:id', async (req, res) => {
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
