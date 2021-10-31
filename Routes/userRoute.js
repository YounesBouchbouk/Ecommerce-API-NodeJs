const express = require('express')
const AuthCont = require('./../Controllers/AuthControllers')
const route = express.Router()

route.post('/SignUp' ,AuthCont.SignUp)
route.post('/login' ,AuthCont.signin)

route.post('/ForgetMyPassword' , AuthCont.forgotPassword)
route.post('/resetPassword/:token',AuthCont.resetPassword)

module.exports = route

