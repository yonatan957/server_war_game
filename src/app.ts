import express from 'express'
import 'dotenv/config'
import usersController from './controllers/users'

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use('users', usersController)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})