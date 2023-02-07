const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const dotenv = require('dotenv')
const colors = require('colors')
const ConnectionDB = require('./config/db')
const logger = require("morgan");

//configure

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger("dev"));

ConnectionDB()


//schema

const productSchema = new mongoose.Schema({
  productName:{
    type:String,
    required:[true,"Please filled productName"]
  },
  description:{
    type:String,
    required:[true,"Please filled description"]
  },
  price:{
    type:String,
    required:[true,"Please filled price"]
  },
  quantity:{
    type:Number,
    required:[true,"Please filled quantity"]
  }
})

const Product = mongoose.model("product",productSchema)

//restful tasks



//create product

app.post("/api/v1/add/product", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "product added successfully!",
    product,
  });
 
});



//read product

app.get("/api/v1/add/products",async(req,res)=>{
  const products = await Product.find();
  res.status(200).json({
    success:true,
    message: "Product gets successfully",
    products,
  })
})


//update product


app.put("/api/v1/product/update/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found!",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    success: true,
    message: "product update successfully!",
    product,
  });
});



//delete product
app.delete("/api/v1/product/delete/:id",async(req,res)=>{
  const product =  Product.findById(req.params.id);
  if(!product){
    return res.status(404).json({
      success:false,
      message: "product not found!"
    })

  }

  await product.remove();
  res.status(200).json({
    success:true,
    message: "product deleted successfully!"
  })
})






//port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(
    `Server is running at port: http://localhost:${PORT}`.cyan.underline.bold,
  )
})
