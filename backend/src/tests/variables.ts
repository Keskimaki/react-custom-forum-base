import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import { BoardType, ThreadType, PostType } from '../types'

interface BoardTypeDB extends BoardType {
  _id: ObjectId
}

interface ThreadTypeDB extends ThreadType {
  _id?: ObjectId
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
  status: 'open',
  url: 'new',
  threads: []
}

export const initialThreads: ThreadTypeDB[] = [
  {
    _id: new mongoose.Types.ObjectId('61d01a094b8886eb7deb9b34'),
    name: 'Test Thread 1',
    date: new Date(),
    status: 'open',
    user: new mongoose.Types.ObjectId(),
    board: initialBoard._id,
    posts: []
  },
  {
    name: 'Test Thread 2',
    date: new Date(),
    status: 'closed',
    user: new mongoose.Types.ObjectId(),
    board: initialBoard._id,
    posts: []
  }
]

export const newThread: ThreadType = {
  name: 'New Thread',
  date: new Date(),
  status: 'open',
  user: new mongoose.Types.ObjectId(),
  board: initialBoard._id,
  posts: []
}

export const initialPosts: PostType[] = [
  {
    content: 'Test Comment 1',
    status: 'visible',
    date: new Date(),
    responseTo: [],
    repliesTo: [],
    user: new mongoose.Types.ObjectId(),
    thread: initialThreads[0]._id as ObjectId
  },
  {
    content: 'Test Comment 2',
    status: 'visible',
    date: new Date(),
    responseTo: [],
    repliesTo: [],
    user: new mongoose.Types.ObjectId(),
    thread: initialThreads[0]._id as ObjectId
  },
  {
    content: 'Test Comment 3',
    status: 'visible',
    date: new Date(),
    responseTo: [],
    repliesTo: [],
    user: new mongoose.Types.ObjectId(),
    thread: initialThreads[0]._id as ObjectId
  }
]

export const newPost: PostType = {
  content: 'New Comment',
  status: 'visible',
  date: new Date(),
  responseTo: [],
  repliesTo: [],
  user: new mongoose.Types.ObjectId(),
  thread: initialThreads[0]._id as ObjectId
}