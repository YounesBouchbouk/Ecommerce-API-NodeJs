const mongoose = require('mongoose')

const CategorieSchema = mongoose.Schema({
    Title : {
        String : String
    },
    Description : String,
    CreatedAt : Date.now()
    
})

const Categorie = mongoose.model('Categories'  ,CategorieSchema )

module.exports = Categorie