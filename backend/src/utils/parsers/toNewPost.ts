import { ObjectId } from 'mongodb'
import { isString, isArray, isObjectId, isObjectIdList, parseUser } from '.'
import { PostType, PostStatus } from '../../types'

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing content')
  }
  return text
}

const parseResponses = (responses: unknown): ObjectId[] => {
  if (!responses || !isArray(responses) || !isObjectIdList(responses)) {
    throw new Error('Incorrect responses')
  }
  return responses
}

const parseThread = (thread: unknown): ObjectId => {
  if (!thread || !isObjectId(thread)) {
    throw new Error('Incorrect or missing thread ID')
  }
  return thread
}

const isStatus = (status: string): status is PostStatus => {
  return ['visible', 'removed', 'deleted', 'waiting'].includes(status)
}

const parseStatus = (status: unknown): PostStatus => {
  if (!status || !isString(status) || !isStatus(status)) {
    throw new Error('Incorrect status')
  }
  return status
}

type Fields = { content: unknown, user: unknown, responseTo: unknown, thread: unknown, status: unknown }

const toNewPost = ({ content, user, responseTo, thread, status }: Fields): PostType  => {
  const newPost: PostType = {
    content: parseString(content),
    user: parseUser(user),
    responseTo: responseTo ? parseResponses(responseTo) : [],
    thread: parseThread(thread),
    status: status ? parseStatus(status) : 'visible',
    date: new Date(),
    repliesTo: [],
  }
  return newPost
}

export default toNewPost
