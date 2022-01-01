import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import { BoardType, ThreadType } from '../types'

interface BoardTypeDB extends BoardType {
  _id: ObjectId
}

export const initialBoard: BoardTypeDB = {
  _id: new mongoose.Types.ObjectId('61d018c45e36f6b8d8c1ede8'),
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
    board: initialBoard._id as ObjectId,
    posts: []
  },
  {
    name: 'Test Thread 2',
    date: new Date(),
    status: 'closed',
    user: new mongoose.Types.ObjectId(),
    board: initialBoard._id as ObjectId,
    posts: []
  }
]

export const newThread: ThreadType = {
  name: 'New Thread',
  date: new Date(),
  status: 'open',
  user: new mongoose.Types.ObjectId(),
  board: initialBoard._id as ObjectId,
  posts: []
}
