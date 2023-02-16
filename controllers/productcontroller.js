const Product = require("../models/Product")
const getDataUri = require("../utils/datauri");
const cloudinary = require("cloudinary");

exports.createProduct = async(req,res)=>{
 
    try {
        const {
            productName,
            description,
            category,
            SKU,
            manufacturer,
            isInStock,
            price,
            quantity
          } = req.body;



         let file;
         if(req.file){
           file = req.file;
         }else{
            return res.status(400),json({
              success:false,
              message: "file not found! "
            })
          }
          
        
         
            if(!productName || !description || !category ||!SKU ||!manufacturer ||!isInStock ||!price ||!quantity){
                return res.status(400).json({
                   success: false,
                   message : "Filled must be filled"
                })
            }

            const fileUri = getDataUri(file);

            const myCloud = await cloudinary.v2.uploader.upload(fileUri.content,{
              folder:"productImg"
            })


          const product = await Product.create({
            productName,
            description,
            category,
            SKU,
            manufacturer,
            isInStock,
            price,
            quantity,
            productImg:{
              public_id: myCloud.public_id,
              url:myCloud.secure_url,
            }
            
            // productImg:file

          })
        

          res.status(201).json({
            success:true,
            message : "product created successfully ",
            product,
          })

        
    } catch (error) {

      console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    })
        
    }
}






//getallproducts

exports.getAllProducts = async(req,res)=>{
    try {
        const products = Product.find();
        if (!products ){
            return res.status(404).json({
                success:false,
                message: "product not found"
            })

        }
        res.staus(200).json({
            success: true,
            message : "product get successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}


//get single product

exports.singleProduct = async(req,res)=>{
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({
        success:false,
        message:"Product not found!"
      })
    }
    res.status(200).json({
      success:true,
      message:"product get successfully!",
      data: product,

    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: "id not found!"
    })
  }
}






//update products

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
      quantity
      
    } = req.body;

    let file;
    if (req.file) {
      file = req.file;
    } else {
      return res.status(400).json({
        success: false,
        message: "file was not upload!",
      });
    }
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
      !price ||
      !quantity
    ) {
      return res.status(400).json({
        success: false,
        message: "Fields must be filled!",
      });
    }
    let myCloud;
    if (file) {
      if (product.productImg.public_id) {
        await cloudinary.v2.uploader.destroy(product.productImg.public_id, {
          folder: "productImg",
        });
      }
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
        quantity,
        productImg: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        // productImg: file,
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
  
    







//delete product


exports.deleteproducts = async(req,res)=>{
  
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
              success: false,
              message: "product not found!",
            });
          }
          

        const productImageId = product.productImg.public_id;
        if(productImageId){
          await cloudinary.v2.uploader.destroy(productImageId,{
            folder: "productImg"
          })
        }
          await product.remove();
          res.status(200).json({
            success: true,
            message: "product delete successfully!",
          });
         
      
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
    })
    }
}
