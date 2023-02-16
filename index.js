const express = require('express')
const mongoose = require('mongoose')
mongoose.set("strictQuery",true);
const dotenv = require('dotenv')
const colors = require('colors')
const ConnectionDB = require('./config/db');
const logger = require("morgan");
const cloudinary = require("cloudinary");

//configure

dotenv.config();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger("dev"))


ConnectionDB();


// cloudinary config

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API ,
  api_secret : process.env.CLOUDINARY_CLIENT_SECRET,
})



//routes


app.use("/api/v1",require("./routes/productroutes"));
app.use("/api/v1",require("./routes/userRoutes"));

//url to provide access  for the image
app.use(express.static("public/gallery"))


app.get("/",(req,res)=>{
  res.send("<h1>Server is working</h1>")
})


//port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(
    `Server is running at port: http://localhost:${PORT}`.cyan.underline.bold,
  )
})
  
