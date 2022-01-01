import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Board from '../models/board'
import { initialBoard, newBoard } from './variables'

beforeEach(async () => {
  await Board.deleteMany({})
  const boardObject = new Board(initialBoard)
  await boardObject.save()
})

const api = supertest(app)

test('boards are returned as json', async () => {
  await api
    .get('/api/boards')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there is one board', async () => {
  const res = await api.get('/api/boards')

  expect(res.body).toHaveLength(1)
})

test('the board name and description are correct', async () => {
  const res = await api.get('/api/boards')

  expect(res.body[0].name).toBe(initialBoard.name)
  expect(res.body[0].description).toBe(initialBoard.description)
})

test('new board can be added', async () => {
  await api
    .post('/api/boards')
    .send(newBoard)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/boards')

  expect(res.body).toHaveLength(2)
  expect(res.body[1].name).toBe(newBoard.name)
})

afterAll(() => {
  void mongoose.connection.close()
})