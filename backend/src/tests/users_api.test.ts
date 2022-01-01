import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user'
import { initialUsers, newUser } from './variables'

beforeEach(async () => {
  await User.deleteMany({})
  for (let i = 0; i < initialUsers.length; i++) {
    const userObject = new User(initialUsers[i])
    await userObject.save()
  }
})

const api = supertest(app)

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two users', async () => {
  const res = await api.get('/api/users')

  expect(res.body).toHaveLength(2)
})

test('username and privileges are correct', async () => {
  const res = await api.get('/api/users')

  expect(res.body[0].username).toBe(initialUsers[0].username)
  expect(res.body[0].privileges).toBe(initialUsers[0].privileges)
})

test('user can log in', async () => {
  const loginData = {
    username: initialUsers[1].username,
    password: 'password'
  }

  const res = await api
    .post('/api/login')
    .send(loginData)
    .expect(200)

  expect(res.body.token).toBeDefined()
  expect(res.body.privileges).toBe(initialUsers[1].privileges)
})

test('user can be edited', async () => {
  const editData = {
    email: 'test@email.com',
    details: {
      name: 'Test Tester'
    }
  }

  await api
    .put(`/api/users/${initialUsers[1]._id}`)
    .send(editData)
    .expect(204)

  const res = await api.get('/api/users')

  expect(res.body[1].email).toBe(editData.email)
  expect(res.body[1].details.name).toBe(editData.details.name)
})

test('user can be deleted', async () => {
  await api
    .delete(`/api/users/${initialUsers[1]._id}`)
    .send({ password: 'password' })
    .expect(204)
  
  const res = await api.get('/api/users')
  
  expect(res.body).toHaveLength(1)
})

test('new user can be added', async () => {
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/users')

  expect(res.body).toHaveLength(3)
  expect(res.body[2].username).toBe(newUser.username)
})

afterAll(() => {
  void mongoose.connection.close()
})
