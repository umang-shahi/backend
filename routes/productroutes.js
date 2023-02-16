const express = require("express");
const { createProduct, getAllProducts ,updateProduct, deleteproducts,singleProduct} = require("../controllers/productcontroller");
const singleUpload = require("../middlewares/multer")

// const upload = require("../file/upload");

const router = express.Router();

//create product route 

router.route("/add/product").post( singleUpload, createProduct)

router.route("/product").get(getAllProducts);

//single route

router.route("/single/product/:id").get(singleProduct);

router.route("/product/update/:id")
.put(singleUpload, updateProduct);

router.route("/product/delete/:id").delete(deleteproducts);

module.exports = router;