const express = require('express')
const morgan = require('morgan')
const userRouting = require('./Routes/userRoute')
const productRouting = require('./Routes/ProductRoute')
const categorieRouting = require('./Routes/CategorieRoute')
const cookieparser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieparser())

app.use('/api/v1/user' , userRouting)
app.use('/api/v1/' , productRouting)
app.use('/api/v1/Categories',categorieRouting)

module.exports = app
