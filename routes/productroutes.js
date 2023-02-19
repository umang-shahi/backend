const express = require("express");
const {
  createproduct,
  getAllProducts,
  updateProduct,
  deleteProducts,
  singleProduct,
} = require("../controllers/productController");
const { isAuthAdmin, auth } = require("../middlewares/auth");
const singleUpload = require("../middlewares/multer");
// const upload = require("../file/upload");
const router = express.Router();
//create product route
// router.route("/add/product").post(upload.single("productImg"), createproduct);
router.route("/add/product").post(auth,isAuthAdmin,singleUpload, createproduct); //multer use gareko xam so
//get all product
router.route("/products").get(getAllProducts);
//single product
router.route("/single/products/:id").get(singleProduct);
//update products
router
  .route("/product/update/:id")
  // .put(upload.single("productImg"), updateProduct);
  .put(auth,isAuthAdmin,singleUpload, updateProduct); //multer use gareko xam so
//delete
router.route("/product/delete/:id").delete(auth,isAuthAdmin,deleteProducts);
module.exports = router;