import { ObjectId } from 'mongodb'
import parser from '.'
import { ThreadType, ThreadStatus } from '../../types'

const parseString = (text: unknown): string => {
  if (!text || !parser.isString(text) || text.includes('#')) {
    throw new Error('Incorrect or missing name or description')
  }
  const filteredText = parser.filterWords(text)
  return filteredText
}

const parseBoard = (board: unknown): ObjectId => {
  if (!board || !parser.isObjectId(board)) {
    throw new Error('Incorrect or missing board ID')
  }
  return board
}

const isStatus = (status: string): status is ThreadStatus => {
  return ['open', 'closed'].includes(status)
}

const parseStatus = (status: unknown): ThreadStatus => {
  if (!status || !parser.isString(status) || !isStatus(status)) {
    throw new Error('Incorrect status')
  }
  return status
}

type Fields = { name: unknown, description: unknown, user: unknown, board: unknown, status: unknown }

const toNewThread = ({ name, user, board, status }: Fields): ThreadType => {
  const newThread: ThreadType = {
    name: parseString(name),
    user: parser.parseUser(user),
    board: parseBoard(board),
    status: status ? parseStatus(status) : 'open',
    date: new Date(),
    posts: []
  }
  return newThread
}

type Edit = { status: ThreadStatus}

const toEditThread = ({ status }: { status: unknown }): Edit => {
  const editThread: Edit = {
    status: parseStatus(status)
  }
  return editThread
}

const threadParser = {
  toNewThread,
  toEditThread
}

export default threadParser