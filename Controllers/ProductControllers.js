const CatchAsync = require('./../utils/asyncError')
const AppError = require('./../utils/appError')
const Product = require('./../Models/ProductModel')
const ApiFeature = require('./../utils/apiGlobalFeature')


exports.getProducts = CatchAsync( async (req,res,next) => {
    let filter ={};
    if(req.params.productID) filter={_id  : req.params.productID}

    const featureApi = new ApiFeature(Product.find(filter),req.query).filter().sort().limitefields().paningtation()
    const result = await featureApi.query
    res.status(200).json({
        status : 'Done ! ',
        result
    })
})


exports.AddProduct = CatchAsync(async (req,res,next) => {

    const Prod = await Product.create(req.body)

           res.status(201).json({
               status : "succussesfully",
               data : {
            status : "Done" , 
            data : Prod
        }
    })
})