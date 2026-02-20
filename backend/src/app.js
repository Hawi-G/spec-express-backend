import express from 'express'
import userRoutes from './routes/users.routes.js'
import errorHandler from './middlewares/error.middleware.js'

const app = express()
app.use(express.json())
app.use('/users', userRoutes)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})
app.use(errorHandler)
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})