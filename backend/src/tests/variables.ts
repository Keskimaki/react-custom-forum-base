import mongoose from 'mongoose'
import { BoardType, ThreadType } from '../types'

export const initialBoard: BoardType = {
  name: 'TEST - testing',
  description: 'board for testing purposes',
  status: 'open',
  url: 'test',
  threads: []
}

export const newBoard: BoardType = {
  name: 'NEW - new board',
  description: 'create a new board',
  status: 'closed',
  url: 'new',
  threads: []
}

export const initialThreads: ThreadType[] = [
  {
    name: 'Test Thread 1',
    date: new Date(),
    status: 'open',
    user: new mongoose.Types.ObjectId(),
    board: new mongoose.Types.ObjectId(),
    posts: []
  },
  {
    name: 'Test Thread 2',
    date: new Date(),
    status: 'closed',
    user: new mongoose.Types.ObjectId(),
    board: new mongoose.Types.ObjectId(),
    posts: []
  }
]

export const newThread: ThreadType = {
  name: 'New Thread',
  date: new Date(),
  status: 'open',
  user: new mongoose.Types.ObjectId(),
  board: new mongoose.Types.ObjectId(),
  posts: []
}