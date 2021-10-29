const express = require('express')
const morgan = require('morgan')
const userRouting = require('./Routes/userRoute')
const productRouting = require('./Routes/ProductRoute')
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user' , userRouting)
app.use('/api/v1/' , productRouting)


module.exports = app
