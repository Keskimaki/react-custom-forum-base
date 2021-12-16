import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI

const PORT = process.env.PORT

const SECRET = process.env.SECRET

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

if (!MONGODB_URI || !PORT || !SECRET || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error('Missing environmental variables')
}

const env = {
  MONGODB_URI,
  PORT,
  SECRET
}

export default env