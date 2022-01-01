import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user'
import { initialUser, newUser } from './variables'

beforeEach(async () => {
  await User.deleteMany({})
  const userObject = new User(initialUser)
  await userObject.save()
})

const api = supertest(app)

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there is one user', async () => {
  const res = await api.get('/api/users')

  expect(res.body).toHaveLength(1)
})

test('username and privileges are correct', async () => {
  const res = await api.get('/api/users')

  expect(res.body[0].username).toBe(initialUser.username)
  expect(res.body[0].privileges).toBe(initialUser.privileges)
})

test('new user can be added', async () => {
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/users')

  expect(res.body).toHaveLength(2)
  expect(res.body[1].username).toBe(newUser.username)
})

afterAll(() => {
  void mongoose.connection.close()
})
