const express = require('express')
const morgan = require('morgan')
const userRouting = require('./Routes/userRoute')
const productRouting = require('./Routes/ProductRoute')
const categorieRouting = require('./Routes/CategorieRoute')
const ReviewRouting = require('./Routes/ReviewRoute')
const OrdersRouting = require('./Routes/OrdersRoute')
const cookieparser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieparser())

app.use('/api/v1/user' , userRouting)
app.use('/api/v1/' , productRouting)
app.use('/api/v1/Categories',categorieRouting)
app.use('/api/v1/Reviews',ReviewRouting)

app.use('/api/v1/Orders' , OrdersRouting)

module.exports = app
