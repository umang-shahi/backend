const User = require("../models/user");
const getDataUri = require("../utils/datauri");
const cloudinary = require("cloudinary");

exports.register = async (req, res) => {
    const { fullName, mobileNo, email, password } = req.body;



    if (!fullName || !mobileNo || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "filled can't be empty!",
      });
    }
    if (!/^\d{10}$|^\d{1,9}$/.test(mobileNo)) {
      return res.status(400).json({
        success: false,
        message: "mobileNo must be 10 digit long!",
      });
    } else if (mobileNo.length < 10) {
      return res.status(400).json({
        success: false,
        message: "mobileNo must be at least 10 digit long!",
      });
    } else if (mobileNo.length > 10) {
      return res.status(400).json({
        success: false,
        message: "mobileNo can't be less than 10 digit!",
      });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email must be valid!",
      });
    }
    if(password.length < 8){
         return res.status(400).json({
           success: false,
           message: "password must have 8 characters long!",
         });
    }


    let file;
    if(req.file){
      file = req.file
    }else{
      return res.status(400).json({
        success:false,
        message: "file was not upload!"
      })
    }




    try {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "email already exists!",
        });
      }


      const fileUri = getDataUri(file)
      const myCloud = await cloudinary.v2.uploader.upload(fileUri.content,{
        folder:"profileImg"
      })





      const user = await User.create({
        fullName,
        mobileNo,
        email,
        password,
        avatar:{
          public_id: myCloud.public_id,
          url:myCloud.secure_url,
        }
        



      });
      res.status(200).json({
        success: true,
        message: "user register successfully!",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  
  
  
  
  
  //login

  exports.login = async(req,res)=>{
    try {
      const {email,password} = req.body;
      if(email!=="" && password !==""){
        return res.status(400).json({
          success:false,
          message:"filled must be filled!"
        })
      }


      if(!/\S+@\S+\.\S+/.test(email)){
        return res.status(400).json({
          success:false,
          message: "email must be valid"

        })
      }
      try {
        const user = await User.findOne({email}).select("+password");
        if(!user){
          return res.status(400)({
            success:false,
            message: "user doesn't exist"
          })
        }
       
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
          return res.status(400).json({
            success:false,
            message:"invalid credentials!",
          })
        }

       const token = user.getJwtToken();
       res.status(200).json({
        success:true,
        message:"login successfully!",
        user,
        token
       })



      } catch (error) {
        return res.status(500).json({
          success:false,
          message:"filled must be filled!"
        })
      }




    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  