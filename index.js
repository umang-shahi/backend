const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const dotenv = require('dotenv')
const colors = require('colors')
const ConnectionDB = require('./config/db')

//configure

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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









//port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(
    `Server is running at port: http://localhost:${PORT}`.cyan.underline.bold,
  )
})
