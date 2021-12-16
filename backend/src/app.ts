import express from 'express'
import mongoose from 'mongoose'
import aws from 'aws-sdk'
import cors from 'cors'
import env from './utils/config'

import userRouter from './routes/users'
import loginRouter from './routes/login'
import boardRouter from './routes/boards'
import threadRouter from './routes/threads'
import postRouter from './routes/posts'

void mongoose.connect(env.MONGODB_URI)

aws.config.update({ region: 'eu-central-1' })
const s3 = new aws.S3({ apiVersion: '2006-03-01' })

s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
})

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/boards', boardRouter)
app.use('/api/threads', threadRouter)
app.use('/api/posts', postRouter)

export default app