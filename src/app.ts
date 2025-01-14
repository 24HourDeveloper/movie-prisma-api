import express, { Application } from 'express'
import cors from 'cors'
import likeRoutes from './routes/likes.routes'
import movieRoutes from './routes/movies.routes'
import userRoutes from './routes/users.routes'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/likes', likeRoutes)
app.use('/users', userRoutes)
app.use('/movies', movieRoutes)

export default app