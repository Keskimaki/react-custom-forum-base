import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI

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