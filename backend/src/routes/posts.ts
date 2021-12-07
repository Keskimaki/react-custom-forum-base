import express from 'express'
import Post from '../models/post'
import Thread from '../models/thread'
import User from '../models/user'
import checkToken from '../utils/checkToken'

const postRouter = express.Router()

postRouter.get('/', async (_req, res) => {
  const posts = await Post.find({}).populate('thread')
  res.send(posts)
})

postRouter.post('/', async (req, res) => {
  const testi = await checkToken(req)
  console.log(testi)
  if (!checkToken(req)) {
    console.log('täällä käytiin')
    return res.status(401).json({ error: 'token missing or invalid'} )
    //throw new Error('missing authorization')
  }
  const { content, user, responseTo, thread, status } = req.body
  //Assume sent data is correct
  const newPost: any = new Post({
    content,
    user,
    date: new Date(),
    thread,
    responseTo: responseTo ? responseTo : [],
    repliesTo: [],
    status: status ? status : 'visible'
  })

  const savedPost = await newPost.save()
  await Thread.findByIdAndUpdate(thread, { $push: { posts: savedPost.id } })
  await User.findByIdAndUpdate(user, { $push: { posts: savedPost.id } })
  for (let i = 0; i < newPost.responseTo.length; i++) {
    await Post.findByIdAndUpdate(responseTo[i], { $push: { repliesTo: savedPost.id } })
  }
  res.status(201).json(savedPost)
})

/*postRouter.delete('/:id', (req, res) => {
  if (!checkToken) {
    throw new Error('missing authorization')
  }

})*/

export default postRouter
