import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Thread from '../models/thread'
import { initialThreads, newThread } from './variables'

beforeEach(async () => {
  await Thread.deleteMany({})
  for (let i = 0; i < initialThreads.length; i++) {
    const threadObject = new Thread(initialThreads[i])
    await threadObject.save()
  }
})

const api = supertest(app)

test('threads are returned as json', async () => {
  await api
    .get('/api/threads')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two threads', async () => {
  const res = await api.get('/api/threads')

  expect(res.body).toHaveLength(initialThreads.length)
})

test('thread name is correct', async () => {
  const res = await api.get('/api/threads')

  expect(res.body[1].name).toBe(initialThreads[1].name)
})

test('new thread can be created', async () => {
  await api
    .post('/api/threads')
    .send(newThread)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/threads')

  expect(res.body).toHaveLength(initialThreads.length + 1)
  expect(res.body[initialThreads.length].name).toBe(newThread.name)
})

afterAll(() => {
  void mongoose.connection.close()
})
