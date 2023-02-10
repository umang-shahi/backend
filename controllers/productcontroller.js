const Product = require("../models/product");

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
            file = req.file.filename
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
          const product = await Product.create({
            productName,
            description,
            category,
            SKU,
            manufacturer,
            isInStock,
            price,
            quantity,
            productImg:file
          })
        
          res.status(201).json({
            success:true,
            message : " product created successfully ",
            product,
          })
    } catch (error) {

     return res.status(500).json({
        success:true,
        message: error.message
     })

        
    }
}



//getallproducts

exports.getAllProducts = async(req,res)=>{
    try {
        const products = await Product.find()
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
            message: "error! "
        })
    }
}





//update products

exports.updateProduct = async (req, res) => {
    const {
      productName,
      description,
      category,
      SKU,
      manufacturer,
      ratings,
      isInStock,
      price,
      quantity
    } = req.body;

    let file;
    if(req.file){
      file = req.file.filename;

    }else{
      return res.status(400).json({
        success: false,
        message: "file not found!"
      })
    }


    if (
      !productName ||
      !description ||
      !category ||
      !SKU ||
      !manufacturer ||
      !ratings ||
      !isInStock ||
      !price ||
      !quantity
    ) {
      return res.status(400).json({
        success: false,
        message: "filled must be filled!",
      });
    }
    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "product not found!",
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
          isInStock,
          price,
          quantity,
          productImg:file
        },
        { new: true, runValidators: true, useFindAndModify: false }
      );
      res.status(200).json({
        success:true,
        message:"product update successfully!",
        product,
      })
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
      })
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
