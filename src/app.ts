import express from 'express'
import 'dotenv/config'
import usersController from './controllers/users'
import sidController from './controllers/sid'
import { conectToMongo } from './config/DB'
import cors from 'cors'

const PORT = process.env.PORT
const app = express()

conectToMongo()

app.use(express.json())
app.use(cors())

app.use('/sid', sidController)
app.use('/users', usersController)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})