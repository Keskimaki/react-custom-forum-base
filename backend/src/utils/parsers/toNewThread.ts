import { ObjectId } from 'mongodb'
import { isString, isObjectId, parseUser, filterWords } from '.'
import { ThreadType, ThreadStatus } from '../../types'

const parseString = (text: unknown): string => {
  if (!text || !isString(text) || text.includes('#')) {
    throw new Error('Incorrect or missing name or description')
  }
  const filteredText = filterWords(text)
  return filteredText
}

const parseBoard = (board: unknown): ObjectId => {
  if (!board || !isObjectId(board)) {
    throw new Error('Incorrect or missing board ID')
  }
  return board
}

const isStatus = (status: string): status is ThreadStatus => {
  return ['open', 'closed', 'removed', 'waiting'].includes(status)
}

const parseStatus = (status: unknown): ThreadStatus => {
  if (!status || !isString(status) || !isStatus(status)) {
    throw new Error('Incorrect status')
  }
  return status
}

type Fields = { name: unknown, description: unknown, user: unknown, board: unknown, status: unknown }

const toNewThread = ({ name, user, board, status }: Fields): ThreadType => {
  const newThread: ThreadType = {
    name: parseString(name),
    user: parseUser(user),
    board: parseBoard(board),
    status: status ? parseStatus(status) : 'open',
    date: new Date(),
    posts: []
  }
  return newThread
}

export default toNewThread