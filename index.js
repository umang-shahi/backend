const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require('dotenv');
const colors = require("colors");
const ConnectionDB = require("./config/db");







//configure

dotenv.config();




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




ConnectionDB();

//port
const PORT =  process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`.cyan.underline.bold);
});