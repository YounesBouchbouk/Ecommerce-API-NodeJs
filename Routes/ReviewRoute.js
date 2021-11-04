const express = require('express')
const AuthCont = require('./../Controllers/AuthControllers')
const ReviewControllers = require('./../Controllers/ReviewControllers')
const routes = express.Router({mergeParams:true})

routes.route('/').post(AuthCont.private,AuthCont.restrictTo("user"),ReviewControllers.addReview).get(ReviewControllers.Allreviews)


module.exports = routes
