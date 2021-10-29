const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({

    Title : {
        type :String,
        require : [true  , "Product Must have a title"]
    },
    Description : {
        type : String ,
        require : [true  , "Product must have a Decription"]
    },
    CreatedAt : {
        type:Date ,
        default  : Date.now()
    },
    Prix : Number,
    Coupon : {
        type : Number,
        default : 0
    },
    TVA : {
        type : Number,
        default : 0
    },
    Quantite  : {
        type : Number,
        default : 1
    },
    Images : [String],
    updated: Date,
    Categorie: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Categorie'
        }
      ]



}) 

const Product = mongoose.model('Product', ProductSchema)


module.exports = Product