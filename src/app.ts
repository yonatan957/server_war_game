import express from 'express'
import 'dotenv/config'
import usersController from './controllers/users'
import { conectToMongo } from './config/DB'

const PORT = process.env.PORT
const app = express()

conectToMongo()

app.use(express.json())

app.use('users', usersController)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})