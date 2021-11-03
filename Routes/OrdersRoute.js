const express = require('express')
const OrderControllers = require('./../Controllers/OrdersControllers')
const Authen = require('./../Controllers/AuthControllers')
const productCnt = require('./../Controllers/ProductControllers')
const routes = express.Router()

routes.route('/Orders').post(Authen.private ,productCnt.decreaseQuantity,OrderControllers.addOrder).get(OrderControllers.getOrders)

module.exports = routes