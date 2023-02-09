const express = require("express");
const { createProduct, getAllProducts ,updateProduct,deleteproducts} = require("../controllers/productcontroller");
const upload = require("../file/upload");

const router = express.Router()

//create product route 

 router.route("/add/product").post(upload.single("productImg"),createProduct)

router.route("/products").get(getAllProducts);

router.route("/product/update/:id").put(updateProduct);

router.route("/product/delete/:id").delete(deleteproducts);

module.exports = router;