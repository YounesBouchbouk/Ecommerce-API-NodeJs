const mongoose = require('mongoose')

const OrderShchema = mongoose.Schema({
    CreatedAt : {
        type : Date,
        default : Date.now()
    },
    Status : {
        type :String,
        default: 'Processing',
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    delivery_address: {
        street: {type: String, required: 'Street is required'},
        city: {type: String, required: 'City is required'},
        state: {type: String},
        zipcode: {type: String, required: 'Zip Code is required'},
        country: {type: String, required: 'Country is required'},
        phonenumber :{type : String , require : 'Phone number require'}
      },
    User_Cust : {
        
            type : mongoose.Schema.ObjectId,
            ref : "User"
        
      },
    OrderItems : [
        {
            name : {
                type : String,
                require : true
            },
            quantité : {
                type : Number,
                require : true , 

            },
            price : {
                type : Number,
                require : true 
            },
            Product  : {
                type :  mongoose.Schema.ObjectId,
                ref : "Product"
            }
        }
    ],
    PayementInfo : {
        id : {
            type : String,
            require : true, 
        },
        status : {
            type : String   ,
            require : true
        }
    },
    totalPrice : Number,
    TaxPrice : {
        type : Number,
        require : true 
    },
    ShippingPrice : {
        type : Number , 
        require : true
    },
    PaidAt : {
        type : Date,
        default : Date.now()
    },
    DeliveredAt : {
        type : Date
    }
    
})

const Order = mongoose.model('Orders'  ,OrderShchema )

module.exports = Order

