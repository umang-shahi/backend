const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv");
const colors = require("colors");
const ConnectionDB = require("./config/db");
const logger = require("morgan"); //its showa hit method in console
const cloudinary = require("cloudinary");
const errorMiddleware = require("./middlewares/error");
//configure
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

//handled uncaught expection 

process.on("uncaughtException",(err)=>{
  console.log(`Error:${err.message}`.red)
  console.log(`Shutting down the server to handled oncaughtException`)
})




//database connect
ConnectionDB();
//Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});
//routes
app.use("/api/v1/", require("./routes/productRoutes"));
app.use("/api/v1", require("./routes/userRoutes"));
//url to provide access for image
app.use(express.static("public/gallery"));
//server is working or not
app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

//middleware call
app.use(errorMiddleware);
//port
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running at port: http://localhost:${PORT}`.cyan.underline.bold
  );
});


//to handle promise rejection

process.on("unhandledRejection",(err)=>{
  console.log(`Error:${err.message}`.red)
  console.log(`Shutting down the server to handle to handle promise rejection!`)
  server.close(()=>{
    process.exit(1);
  })
})


