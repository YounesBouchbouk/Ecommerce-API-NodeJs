const mongoose = require('mongoose')

const reviewschema = mongoose.Schema({
    review : {
        type : String ,
        mix : 10,
        required : [true , "This champ is required"]
    },
    rating : {
        type : Number,
        required : [true , "rating is require"],
        max : 5

    },
    CreatedAt : {
        type : Date,
        default : Date.now()
    } , 
    Product : {
        type : mongoose.Schema.ObjectId,
        ref : "Product",
        required : [true , "Review must belong to a Product"]
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : [true  , "review must belong to user"]
    }
},{
    toJSON : {virtual : true},
    toObject : {virtual:true}
})

reviewschema.pre(/^find/ , function(next){
    this.populate({
        path : "Product",
        select:'_id Title'
    }).populate({
        path : "user",
        select : '_id FullName'
    })

    next()
})

const Reviews = mongoose.model('Reviews', reviewschema)
module.exports = Reviews