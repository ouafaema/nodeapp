import express from 'express'
import * as dotenv from 'dotenv'
import userRoutes from './routes/user'
import todoListRoutes from './routes/todoList'
import todoItemRoutes from './routes/todoItem'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'
import config from './config'

dotenv.config()

const app = express()
const PORT = config.port

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' })
})

app.use('/api', protect, [
  userRoutes,
  todoListRoutes,
  todoItemRoutes
])

app.post('/signUp', createNewUser)
app.post('/signIn', signIn)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})