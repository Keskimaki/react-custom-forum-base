import express from 'express'
import mongoose from 'mongoose'
import env from './utils/config'

import userRouter from './routes/users'
import boardRouter from './routes/boards'

mongoose.connect(env.MONGODB_URI)

const app = express()
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/boards', boardRouter)

export default app