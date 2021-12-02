import http from 'http'
import app from './app'
import env from './utils/config'

const server = http.createServer(app)

server.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
})