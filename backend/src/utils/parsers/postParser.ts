import { ObjectId } from 'mongodb'
import parser from '.'
import { PostType, PostStatus } from '../../types'
import imageService from '../imageService'
import env from '../config'

const parseString = (text: unknown): string => {
  if (!text || !parser.isString(text)) {
    throw new Error('Incorrect or missing content')
  }
  const filteredText = parser.filterWords(text)
  return filteredText
}

const parseResponses = (responses: unknown): ObjectId[] => {
  if (!responses || !parser.isArray(responses) || !parser.isObjectIdList(responses)) {
    throw new Error('Incorrect responses')
  }
  return responses
}

const parseThread = (thread: unknown): ObjectId => {
  if (!thread || !parser.isObjectId(thread)) {
    throw new Error('Incorrect or missing thread ID')
  }
  return thread
}

const isStatus = (status: string): status is PostStatus => {
  return ['visible', 'removed', 'deleted', 'waiting'].includes(status)
}

const parseStatus = (status: unknown): PostStatus => {
  if (!status || !parser.isString(status) || !isStatus(status)) {
    throw new Error('Incorrect status')
  }
  return status
}

type Fields = { content: unknown, user: unknown, responseTo: unknown, thread: unknown, status: unknown }

const toNewPost = ({ content, user, responseTo, thread, status }: Fields): PostType  => {
  const newPost: PostType = {
    content: parseString(content),
    user: parser.parseUser(user),
    responseTo: responseTo ? parseResponses(responseTo) : [],
    thread: parseThread(thread),
    status: status ? parseStatus(status) : 'visible',
    date: new Date(),
    repliesTo: [],
  }
  return newPost
}

type Edit = {
  content: string,
  responseTo: ObjectId[] | undefined,
  edited: Date
}

const toEditPost = ({ content, responseTo }: { content: unknown, responseTo: unknown }): Edit => {
  const editPost = {
    content: parseString(content),
    responseTo: responseTo ? parseResponses(responseTo) : undefined,
    edited: new Date()
  }
  return editPost
}

const parseImageUrl = (imageUrl: unknown): string => {
  if (!imageUrl || !parser.isString(imageUrl)) {
    throw new Error('Incorrect or missing image url')
  }
  return imageUrl
}

const handleImage = async (imageUrl: unknown, id: ObjectId) => {
  const image = parseImageUrl(imageUrl)
  await imageService.downloadImage(image, `${id}.png`)
  imageService.uploadImage(env.AWS_BUCKET_NAME_1, `${id}.png`)
}

const postParser = {
  toNewPost,
  toEditPost,
  handleImage
}

export default postParser