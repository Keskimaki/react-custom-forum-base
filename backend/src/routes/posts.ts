import express from 'express'
import Post from '../models/post'
import Thread from '../models/thread'

const postRouter = express.Router()

postRouter.get('/', async (_req, res) => {
  const posts = await Post.find({})
  res.send(posts)
})

postRouter.post('/', async (req, res) => {
  const { content, user, responseTo, thread, status } = req.body
  //Assume sent data is correct
  const newPost = new Post({
    content,
    user,
    date: new Date(),
    thread,
    responseTo: responseTo ? responseTo : [],
    repliesTo: [],
    status: status ? status : 'visible'
  })

  const savedPost = await newPost.save()
  await Thread.findByIdAndUpdate(thread, { $push: { posts: savedPost._id } })
  for (let i = 0; i < responseTo.length; i++) {
    console.log('toimiiko')
    await Post.findByIdAndUpdate(responseTo[i], { $push: { repliesTo: savedPost._id } })
  }
  res.status(201).json(savedPost)
})

export default postRouter
