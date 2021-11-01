const express = require('express')
const AuthCont = require('./../Controllers/AuthControllers')
const productsCnt = require('./../Controllers/ProductControllers')
const reviewRoutes = require('./ReviewRoute')
const routes = express.Router()


//switch  to reviews controllers 
routes.use('/:productID/reviews', reviewRoutes)

routes.route('/Products')
            .get(AuthCont.private,productsCnt.getProducts)
            .post(AuthCont.private,productsCnt.AddProduct)
            
routes.route('/Product/:productID') 
            .get(productsCnt.sendProductInReqFromId,productsCnt.getOne)
            .delete(AuthCont.private , productsCnt.DeletePro)
            .put(AuthCont.private,productsCnt.editeproduct)

routes.route('/Product/:productID/related')
            .get(productsCnt.sendProductInReqFromId,productsCnt.related)


module.exports = routes

