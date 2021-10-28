const express = require('express')
const AuthCont = require('./../Controllers/AuthControllers')
const route = express.Router()

route.post('/SignUp' ,AuthCont.SignUp)

module.exports = route

