import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Board from '../models/board'
import { initialBoard } from './variables'

beforeEach(async () => {
  await Board.deleteMany({})
  const newBoard = new Board(initialBoard)
  await newBoard.save()
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

  expect(res.body[0].name).toBe('TEST - testing')
  expect(res.body[0].description).toBe('board for testing purposes')
})

afterAll(() => {
  void mongoose.connection.close()
})