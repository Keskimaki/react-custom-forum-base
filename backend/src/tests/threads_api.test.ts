import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Thread from '../models/thread'
import { initialThreads } from './variables'

beforeEach(async () => {
  await Thread.deleteMany({})
  for (let i = 0; i < initialThreads.length; i++) {
    let threadObject = new Thread(initialThreads[i])
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

  expect(res.body).toHaveLength(2)
})

test('thread name is correct', async () => {
  const res = await api.get('/api/threads')

  expect(res.body[1].name).toBe(initialThreads[1].name)
})

afterAll(() => {
  void mongoose.connection.close()
})