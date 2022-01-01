import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Post from '../models/post'
import { initialPosts, newPost } from './variables'

beforeEach(async () => {
  await Post.deleteMany({})
  for (let i = 0; i < initialPosts.length; i++) {
    let postObject = new Post(initialPosts[i])
    await postObject.save()
  }
})

const api = supertest(app)

test('posts are returned as json', async () => {
  await api
    .get('/api/posts')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three posts', async () => {
  const res = await api.get('/api/posts')

  expect(res.body).toHaveLength(initialPosts.length)
})

test('post content is correct', async () => {
  const res = await api.get('/api/posts')

  expect(res.body[1].content).toBe(initialPosts[1].content)
})

test('new post can be created', async () => {
  await api
    .post('/api/posts')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/posts')

  expect(res.body).toHaveLength(initialPosts.length + 1)
  expect(res.body[initialPosts.length].content).toBe(newPost.content)
})

afterAll(() => {
  void mongoose.connection.close()
})
