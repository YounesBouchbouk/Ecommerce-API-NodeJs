const mongoose = require('mongoose')

const OrderShchema = mongoose.Schema({
    
    CreatedAt : {
        type : Date,
        default : Date.now()
    },
    Status : {
        String,
        default: 'Not processed',
        enum: ['Not processed' , 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    quantity: Number,
    Prix_Total : Number,
    delivery_address: {
        street: {type: String, required: 'Street is required'},
        city: {type: String, required: 'City is required'},
        state: {type: String},
        zipcode: {type: String, required: 'Zip Code is required'},
        country: {type: String, required: 'Country is required'}
      },
    User : {
        
            type : mongoose.Schema.ObjectId,
            ref : "User"
        
      },
    Productes : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Product"
        }
    ]
})

module.exports = mongoose.model('Orders', OrderShchema)