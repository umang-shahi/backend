const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      maxLength: [30, "Character upto 30!"],
      minLength: [4, "Character nust be 4"],
      required: [true, "please filled productName"],
    },
    description: {
      type: String,
      required: [true, "description filled here"],
    },
    productImg: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    category: {
      type: String,
      required: [true, "Please select a category "],
    },
    SKU: {
      type: String,
      required: [true, "select thr sku"],
    },
    manufacturer: {
      type: String,
      required: [true, "select the manufacture"],
    },
    ratings: {
      type: Number,
      min: [0, "Rating must be alest 0"],
      max: [5, "must be up to 5"],
    },
    IsInStock: {
      type: Number,
      required: [true, "Please enter the product stock"],
      maxLength: [5, "Length must be 5"],
      default: 1,
    },

    user:{
      type: mongoose.Schema.ObjectId,
      ref:"user",
      required: "true",
    },

    price: {
      type: Number,
      required: [true, "Price field must be filled"],
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("product", productSchema);
module.exports = Product;