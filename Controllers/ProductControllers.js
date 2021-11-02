const CatchAsync = require('./../utils/asyncError')
const AppError = require('./../utils/appError')
const Product = require('./../Models/ProductModel')
const ApiFeature = require('./../utils/apiGlobalFeature')
const Category = require('./../Models/CategorieModel')



exports.sendProductInReqFromId = CatchAsync( async (req,res,next) => {
    let filter ={};
    if(req.params.productID) filter={_id  : req.params.productID}

    const Query = await  Product.findById(req.params.productID).populate('productreviews')
    
    if(!Query) return next(new AppError("No Product has Found" , 404))
    req.product  = Query;

    next()
})



exports.getProducts = CatchAsync( async (req,res,next) => {
  
    const featureApi = new ApiFeature(Product.find(),req.query)
                                                                    .Search()
                                                                    .filter()
                                                                    .sort()
                                                                    .limitefields()
                                                                    .paningtation()
                                                                    
                                                                
                                                                    
    const result = await featureApi.query.populate({
        path : "Categories",
        select:'_id Title'
    })

    if(!result) return next(new AppError("No Product has Found" , 404))
    res.status(200).json({
        result
    })
})



exports.getOne =  (req,res,next) => {
    const product = req.product ;
    res.status(200).json({
        product
    })
    console.log(req.product);

}


exports.related = CatchAsync(async (req,res,next) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const {Categories} = req.product
    const newarr = Categories.map((itm) => String(itm))

    // const records = await Product.find().where('Categories').in(newarr).exec();
    const records = await Product.find({
        'Categories' : { $in: newarr }  , _id: { $ne: req.product._id }
    }).limit(limit).select('-Images').populate('Categories')

    res.status(200).json({records})

  })


exports.AddProduct = CatchAsync(async (req,res,next) => {

    const Prod = await Product.create(req.body)
    console.log(Prod);
    await Category.updateMany({ '_id': Prod.Categories }, { $push: { products: Prod._id } });


           res.status(201).json({
               status : "succussesfully",
               data : Prod
        
    })
})

exports.DeletePro = CatchAsync(async (req,res,next) => {
    console.log(req.params.productID);
    const product = await Product.findById(req.params.productID);
    console.log(product);
    if(!product) {return next(new AppError("Product not Found " , 404))}
    await product.remove();
    await Category.updateMany({ '_id': product.Categories }, { $pull: { products: product._id } });

    res.status(200).json({
        product
    })
})



function difference(A, B) {
    const arrA = Array.isArray(A) ? A.map(x => x.toString()) : [A.toString()];
    const arrB = Array.isArray(B) ? B.map(x => x.toString()) : [B.toString()];
  
    const result = [];
    for (const p of arrA) {
      if (arrB.indexOf(p) === -1) {
        result.push(p);
      }
    }
  
    return result;
  }


exports.editeproduct = CatchAsync(async (req, res) =>  {
    const _id = req.params.productID;
    const  product  = req.body;
    const newCategories = product.Categories || [];
    
    // console.log(product.Categories);
    
    const oldProduct = await Product.findOne({ _id });
    // console.log(oldProduct);

    const oldCategories = oldProduct.Categories;
    const oldCategories2 = oldCategories.map((item) => String(item._id))

    Object.assign(oldProduct, product);

     const newProduct = await oldProduct.save();
  
   
    const added = difference(newCategories, oldCategories2);
    const removed = difference(oldCategories2, newCategories);

    console.log(added);
    console.log(removed);
     await Category.updateMany({ '_id': added }, { $push: { products: newProduct._id } });
     await Category.updateMany({ '_id': removed }, { $pull: { products: newProduct._id } });
  
    return res.send(newProduct);
  })


//send all products of a categorie passed in the link 

exports.CategorieProducts = CatchAsync(async (req,res,next) => {

    const query = await Category.find(req.params)

    if(query.length == 0) return next(new AppError('Categorie Not Found' , 400))

    const productsArray = query[0].products;

    if(productsArray.length == 0 ) return next(new AppError('Categorie has no products Not Found' , 400))

    const listeprodect = productsArray.map((item)=> String(item))

    console.log(listeprodect);
    
    const product = await Product.find({_id : { $in : listeprodect} })

    res.status(200).json(product);
})