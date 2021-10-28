const express = require('express')
const morgan = require('morgan')
const userRouting = require('./Routes/userRoute')

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user' , userRouting)


module.exports = app
