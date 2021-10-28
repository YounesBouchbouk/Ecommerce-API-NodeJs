// const express = require("express")
const dotenv = require('dotenv')
// const app = express();
const app = require('./app')
dotenv.config({path : './config.env'})
const dbconnection = require('./dbConnect')



app.listen(process.env.PORT , () => {
    console.log("server started on port " + process.env.PORT);
    
})