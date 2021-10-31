const mongoose = require('mongoose')

const CategorieSchema = mongoose.Schema({
    Title : {
        type : String
    },
    Description : String,
    CreatedAt : {
        type : Date , 
        default : Date.now()
    },
    products:  [{ type: mongoose.Types.ObjectId, ref: 'Product' }],

    
})
CategorieSchema.set('toObject', { virtuals: true })
CategorieSchema.set('toJSON', { virtuals: true })

CategorieSchema.virtual("ProductsCount").get(function(){
        if(this.products) return this.products.length
        return 0;
    })


const Categorie = mongoose.model('Categories'  ,CategorieSchema )

module.exports = Categorie