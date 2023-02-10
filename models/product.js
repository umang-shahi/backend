const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    productName:{
        type: String,
        maxlength : [30,"character must be at least 30"],
        minlength: [4,"product character must be 4"],
        required: [true,"please fill productname"]
    },

    description:{
        type: String,
        required: [true, "Plz fill description!"]
    },
     
    productImg:{
       type: String,

    },
    
    category:{
        type: String,
        required: [true,"please select a category"]
    },

    SKU:{
        type:String,
         required: [true, "please provide a SKU"]
    },

    manufacturer:{
    type: String,
    required: [true,"please specify the manufacturer"]
    },

    ratings:{
    type: Number,
    min: [0,"rating must be at least 0"],
    max: [5,"rating cannot be more than 5"]

    },
    
    isInStock:{
      type: Number,
      required: [true,"Please enter required stock"],
      maxlength:[4,"Stock cannot exceed 4 character"],
      default:1
    },

    price:{
        type: Number,
        required: [true,"plz fill price!"]
    },

    quantity:{
        type: Number,
        required: [true,"please fill quantity"]
    }
},{timestamps:true})

const Product = mongoose.model("product",productSchema);

module.exports = Product;
