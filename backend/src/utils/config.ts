import fs from 'fs'
import path from 'path'

if (fs.existsSync(`${path.dirname(__filename)}/../../.env`)) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
  require('dotenv').config()
}

let MONGODB_URI: string | undefined

switch(process.env.NODE_ENV) {
  case 'test':
    MONGODB_URI = process.env.TEST_MONGODB_URI
    break
  case 'production':
    MONGODB_URI = process.env.PROD_MONGODB_URI
    break
  default:
    MONGODB_URI = process.env.DEV_MONGODB_URI
}

const PORT = process.env.PORT

const SECRET = process.env.SECRET

const FILTER = process.env.FILTER?.split(' ')

const AWS_BUCKET_NAME_1 = process.env.AWS_BUCKET_NAME_1
const AWS_BUCKET_NAME_2 = process.env.AWS_BUCKET_NAME_2

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

if (!MONGODB_URI || !PORT || !SECRET || !AWS_BUCKET_NAME_1 || !AWS_BUCKET_NAME_2 || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error('Missing environmental variables')
}

const env = {
  MONGODB_URI,
  PORT,
  SECRET,
  FILTER: FILTER ? FILTER : [],
  AWS_BUCKET_NAME_1,
  AWS_BUCKET_NAME_2
}

export default env
