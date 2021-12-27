import parser from '.'
import { BoardType, BoardStatus } from '../../types'

const parseString = (text: unknown): string => {
  if (!text || !parser.isString(text)) {
    throw new Error('Incorrect or missing board name or description')
  }
  return text
}

const isStatus = (status: string): status is BoardStatus => {
  return ['open', 'closed'].includes(status)
}

const parseStatus = (status: unknown): BoardStatus => {
  if (!status || !parser.isString(status) || !isStatus(status)) {
    throw new Error('Incorrect status')
  }
  return status
}

const checkUrl = (url: string): boolean => {
  const accepted = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=".split("")
  for (let i = 0; i < url.length; i++) {
    if (!accepted.includes(url[i])) {
      return false
    }
  }
  return true
} 

const parseUrl = (url: unknown) => {
  if (!url || !parser.isString(url) || !checkUrl(url)) {
    throw new Error('Incorrect or missing url')
  }
  return url
}

type Fields = { name: unknown, description: unknown, status: unknown, url: unknown }

const toNewBoard = ({ name, description, status, url }: Fields): BoardType => {
  const newBoard: BoardType = {
    name: parseString(name),
    description: parseString(description),
    status: status ? parseStatus(status) : 'open',
    url: parseUrl(url),
    threads: []
  }
  return newBoard
}

export default toNewBoard