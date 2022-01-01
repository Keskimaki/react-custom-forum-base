import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Post from '../models/post'
import { initialPosts, newPost, initialUsers } from './variables'

beforeEach(async () => {
  await Post.deleteMany({})
  for (let i = 0; i < initialPosts.length; i++) {
    const postObject = new Post(initialPosts[i])
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

test('post can be edited', async () => {
  const editData = {
    content: 'Test Editing Post',
    userId: initialUsers[1]._id
  }

  await api
    .put(`/api/posts/${initialPosts[0]._id}`)
    .send(editData)
    .expect(204)

    const res = await api.get('/api/posts')
  
    expect(res.body[0].content).toBe(editData.content)
})

test('post can be deleted', async () => {
  await api
    .delete(`/api/posts/${initialPosts[0]._id}`)
    .expect(204)

  const res = await api.get('/api/posts')
  
  expect(res.body).toHaveLength(initialPosts.length - 1)
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
