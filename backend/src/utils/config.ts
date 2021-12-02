import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI

const PORT = process.env.PORT

if (!MONGODB_URI || !PORT) {
  throw new Error('missing environmental variables')
}

const env = {
  MONGODB_URI,
  PORT
}

export default env