const Product = require("../models/product");
const getDataUri = require("../utils/datauri");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apifeatures");
exports.createproduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      SKU,
      manufacturer,
      ratings,
      IsInStock,
      price,
    } = req.body;
    let file;
    if (req.file) {
      file = req.file;
      // console.log(file);
    } else {
      return res.status(400).json({
        success: false,
        message: "file is not upload",
      });
    }
    if (
      !productName ||
      !description ||
      !category ||
      !SKU ||
      !manufacturer ||
      !ratings ||
      !IsInStock ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "filled must be filled!",
      });
    }
    const fileUri = getDataUri(file); // file lai datauri ma convert gareko  code chai datauri.js ma xa .. herefunction call is done
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      folder: "productImg",
    });
    const product = await Product.create({
      productName,
      description,
      category,
      SKU,
      manufacturer,
      ratings,
      IsInStock,
      price,
      productImg: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      // productImg: file,
    });
    res.status(201).json({
      success: true,
      message: "product create successfully!",
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//getProduct
exports.getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 5;
    const apifeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apifeatures.query;
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "product get successfully!",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//get single product on the basis of id
exports.singleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "product get successfully!",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//update
exports.updateProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      SKU,
      manufacturer,
      ratings,
      IsInStock,
      price,
    } = req.body;
    let file;
    if (req.file) {
      file = req.file;
    } else {
      return res.status(400).json({
        success: false,
        message: "file was not upload",
      });
    }
    //id check garxa
    const productId = req.params.id;
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
    if (
      !productName ||
      !description ||
      !category ||
      !SKU ||
      !manufacturer ||
      !ratings ||
      !IsInStock ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "Fields must be filled!",
      });
    }
    let myCloud;
    //Destroy
    if (file) {
      if (product.productImg.public_id) {
        await cloudinary.v2.uploader.destroy(product.productImg.public_id, {
          folder: "productImg",
        });
      }
      //new upload
      const fileUri = getDataUri(file);
      myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        folder: "productImg",
      });
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        description,
        category,
        SKU,
        manufacturer,
        ratings,
        IsInStock,
        price,
        productImg: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//delete
exports.deleteProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }
    // if (product.productImg.public_id) {
    //   await cloudinary.v2.uploader.destroy(product.productImg.public_id, {
    //     folder: "productImg",
    //   });
    // }
    //cloudinary ma delete huney Same ho
    const productImgId = product.productImg.public_id;
    if (productImgId) {
      await cloudinary.v2.uploader.destroy(productImgId, {
        folder: "productImg",
      });
    }
    await product.remove(); //database ma delete huncha
    res.status(200).json({
      success: true,
      message: "product remove successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};