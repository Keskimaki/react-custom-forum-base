import { BoardType } from '../types'

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
