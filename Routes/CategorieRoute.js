const express = require('express')
const AuthCont = require('./../Controllers/AuthControllers')
const CategorieControl = require('./../Controllers/CategoriesControllers')
const routes = express.Router()


routes.route('/').post(AuthCont.private ,CategorieControl.AddCategorie  )
               .get(AuthCont.private ,CategorieControl.GetAllCategories )

module.exports = routes
