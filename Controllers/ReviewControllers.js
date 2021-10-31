const Review = require('../Models/ReviewModel')
const CatchAsync = require('./../utils/asyncError')
const AppError = require('./../utils/appError')
const ApiFeature = require('./../utils/apiGlobalFeature')
const { find } = require('../Models/CategorieModel')

exports.addReview = CatchAsync(async (req,res,next) =>{
    console.log(req.user);
    console.log(req.params);

    const newdt = {
        user : req.user._id,
        Product : req.params.productID
    }

    Object.assign(newdt , req.body)
    
    console.log(newdt);

    await Review.create(newdt)

    res.status(200).json(newdt)
})

exports.Allreviews = CatchAsync(async (req,res,next) =>{
    console.log("hi");
    const data  = await Review.find()


    res.status(200).json({
        data
    })
}) 