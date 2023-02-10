const express = require('express')
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


ConnectionDB()


//routes
app.use("/api/v1",require("./routes/productroutes"));

//url to pprovide access  for the image
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
