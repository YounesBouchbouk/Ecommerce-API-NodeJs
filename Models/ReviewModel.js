const mongoose = require('mongoose')

const reviewschema = mongoose.Schema({
    review : {
        type : String ,
        mix : 10,
        required : [true , "This champ is required"]
    },
    rating : {
        type : Number,
        required : [true , "rating is require"]

    },
    CreatedAt : {
        type : Date,
        default : Date.now
    } , 
    Product : {
        type : mongoos.Schema.ObjectId,
        ref : "Product",
        required : [true , "Review must belong to a Product"]
    },
    user : {
        type : mongoos.Schema.ObjectId,
        ref : "User",
        required : [true  , "review must belong to user"]
    }
},{
    toJSON : {virtual : true},
    toObject : {virtual:true}
})

const Reviews = mongoose.model('Reviews', reviewschema)
