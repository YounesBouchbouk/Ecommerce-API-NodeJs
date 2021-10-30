const CatchAsync = require('./../utils/asyncError')
const AppError = require('./../utils/appError')
const Categorie = require('./../Models/CategorieModel')
const ApiFeature = require('./../utils/apiGlobalFeature')


exports.AddCategorie = CatchAsync(async (req,res,next) => {
    const newon = await Categorie.create(req.body)

    res.status(200).json({
        newon
    })
})

exports.GetAllCategories = CatchAsync(async (req,res,next) => {
    const AllCate = await Categorie.find()

    res.status(200).json({
        AllCate
    })
})