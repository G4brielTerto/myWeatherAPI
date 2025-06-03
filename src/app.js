require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const wheaterRoutes = require('./route_wheater')

const app = express()

app.use(cors())
app.use(express.json())


const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "excesso de requisições, tente de novo mais tarde"
})

app.use(limiter)
app.use('/weater', wheaterRoutes)

// const PORT = c || 3000

// console.log(process.env)

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})