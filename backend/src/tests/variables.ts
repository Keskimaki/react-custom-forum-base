import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import { UserType, BoardType, ThreadType, PostType } from '../types'

interface UserTypeDB extends UserType {
  _id: ObjectId
}

interface BoardTypeDB extends BoardType {
  _id: ObjectId
}

interface ThreadTypeDB extends ThreadType {
  _id: ObjectId
}

interface PostTypeDB extends PostType {
  _id: ObjectId
}

export const initialUsers: UserTypeDB[] = [
  {
    _id: new mongoose.Types.ObjectId('61d046218385d72cc32e2b6e'),
    username: 'Root',
    passwordHash: '$2a$10$iR5Iern2HZSrno8aFYHcr.6XiHYHAt3fXeC3YYCkV1TtihBa9XFcq',
    date: new Date(),
    posts: [],
    following: [],
    privileges: 'admin'
  },
  {
    _id: new mongoose.Types.ObjectId('61cd6a10ab77c6914acf188a'),
    username: 'Tester',
    passwordHash: '$2a$10$4FyopXOHLvL0TBsi2vE9nu3b5/LrPlDWoCYwDqUHlr72XunSGOK9S',
    date: new Date(),
    posts: [
      new mongoose.Types.ObjectId('61d035dec78ef1a9a08db634'),
      new mongoose.Types.ObjectId('61d035dec78ef1a9a08db636'),
      new mongoose.Types.ObjectId('61d035dec78ef1a9a08db638')
    ],
    following: [],
    privileges: 'mod'
  }
]

export const newUser = {
  username: 'NewUser',
  password: 'password',
  date: new Date(),
  posts: [],
  following: [],
  privileges: 'user'
}

export const initialBoard: BoardTypeDB = {
  _id: new mongoose.Types.ObjectId('61d018c45e36f6b8d8c1ede8'),
  name: 'TEST - testing',
  description: 'board for testing purposes',
  status: 'open',
  url: 'test',
  threads: [
    new mongoose.Types.ObjectId('61d01a094b8886eb7deb9b34'),
    new mongoose.Types.ObjectId('61d02e4ee29cb3bb820f62a1')
  ]
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
    _id: initialBoard.threads[0],
    name: 'Test Thread 1',
    date: new Date(),
    status: 'open',
    user: initialUsers[1]._id,
    board: initialBoard._id,
    posts: initialUsers[1].posts
  },
  {
    _id: initialBoard.threads[1],
    name: 'Test Thread 2',
    date: new Date(),
    status: 'closed',
    user: initialUsers[1]._id,
    board: initialBoard._id,
    posts: []
  }
]

export const newThread: ThreadType = {
  name: 'New Thread',
  date: new Date(),
  status: 'open',
  user: initialUsers[1]._id,
  board: initialBoard._id,
  posts: []
}

export const initialPosts: PostTypeDB[] = [
  {
    _id: initialUsers[1].posts[0],
    content: 'Test Comment 1',
    status: 'visible',
    date: new Date(),
    responseTo: [],
    repliesTo: [],
    user: initialUsers[1]._id,
    thread: initialThreads[0]._id
  },
  {
    _id: initialUsers[1].posts[1],
    content: 'Test Comment 2',
    status: 'visible',
    date: new Date(),
    responseTo: [],
    repliesTo: [],
    user: initialUsers[1]._id,
    thread: initialThreads[0]._id
  },
  {
    _id: initialUsers[1].posts[2],
    content: 'Test Comment 3',
    status: 'visible',
    date: new Date(),
    responseTo: [],
    repliesTo: [],
    user: initialUsers[1]._id,
    thread: initialThreads[0]._id
  }
]

export const newPost: PostType = {
  content: 'New Comment',
  status: 'visible',
  date: new Date(),
  responseTo: [],
  repliesTo: [],
  user: initialUsers[0]._id,
  thread: initialThreads[0]._id
}
