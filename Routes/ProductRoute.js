const express = require('express')
const AuthCont = require('./../Controllers/AuthControllers')
const productsCnt = require('./../Controllers/ProductControllers')
const routes = express.Router()

routes.route('/Products')
            .get(productsCnt.getProducts)
            .post(AuthCont.private,productsCnt.AddProduct)
routes.route('/Product/:productID') .get(productsCnt.getProducts)

module.exports = routes
