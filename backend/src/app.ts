import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import env from './utils/config'

import userRouter from './routes/users'
import loginRouter from './routes/login'
import boardRouter from './routes/boards'
import threadRouter from './routes/threads'
import postRouter from './routes/posts'
import testingRouter from './routes/testing'

void mongoose.connect(env.MONGODB_URI)

const app = express()
app.use(cors())
app.use(express.json())

//app.use(express.static('build')) //For Heroku
//Allow reseting testing database
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/boards', boardRouter)
app.use('/api/threads', threadRouter)
app.use('/api/posts', postRouter)

export default app