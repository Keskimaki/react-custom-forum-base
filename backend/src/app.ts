import express from 'express'
import userRouter from './routes/users'
import boardRouter from './routes/boards'

const app = express()
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/boards', boardRouter)

export default app