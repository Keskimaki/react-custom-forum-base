import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI

const PORT = process.env.PORT

const SECRET = process.env.SECRET

if (!MONGODB_URI || !PORT || !SECRET) {
  throw new Error('Missing environmental variables')
}

const env = {
  MONGODB_URI,
  PORT,
  SECRET
}

export default env