const express = require('express')
const OrderControllers = require('./../Controllers/OrdersControllers')
const AuthCont = require('./../Controllers/AuthControllers')
const productCnt = require('./../Controllers/ProductControllers')
const routes = express.Router()

routes.route('/Orders').post(AuthCont.private ,productCnt.decreaseQuantity,OrderControllers.addOrder).get(OrderControllers.getOrders)
routes.route('/:OrderId/ChangeStatus/:Status')
                                            .put(
                                                AuthCont.private,
                                                AuthCont.restrictTo("admin"),
                                                OrderControllers.orderById,  
                                                productCnt.ifCancelledToIncrease,
                                                OrderControllers.ChangeStatus)
module.exports = routes