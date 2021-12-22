import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import env from '../config'

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

export const isArray = (list: unknown): list is unknown[] => {
  return Array.isArray(list)
}

export const isObjectId = (id: unknown): id is ObjectId => {
  return mongoose.isValidObjectId(id)
}

export const isObjectIdList = (list: unknown[]): list is ObjectId[] => {
  for (let i = 0; i < list.length; i++) {
    if (!isObjectId(list[i])) {
      return false
    }
  }
  return true
}

export const parseUser = (user: unknown): ObjectId => {
  if (!user || !isObjectId(user)) {
    throw new Error('Incorrect or missing user ID')
  }
  return user
}

export const filterWords = (text: string): string => {
  const filterWord = (word: string): boolean => {
    const formatWord = word.replace(/[&\/\\#, +()$~%.'":;*!?<>{}]/g, '').toLowerCase()
    for (let i = 0; i < env.FILTER.length; i++) {
      if (env.FILTER[i] === formatWord) {
        return false
      }
    }
    return true
  }
  const filteredText = text.split(' ').filter(word => filterWord(word)).join(' ')
  return filteredText
}
