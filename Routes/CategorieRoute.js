const express = require('express')
const AuthCont = require('./../Controllers/AuthControllers')
const CategorieControl = require('./../Controllers/CategoriesControllers')
const ProductRoute= require('./ProductRoute')
const routes = express.Router()


routes.use('/:Title', ProductRoute)

routes.route('/').post(AuthCont.private ,CategorieControl.AddCategorie  )
               .get(AuthCont.private ,CategorieControl.GetAllCategories )



module.exports = routes
