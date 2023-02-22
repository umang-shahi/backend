// const ErrorHandler=require("../utiles/errorhandle");
// module.exports=(err,req,res,next)=>{
//     err.statuscode=err.statuscode || 500
//     err.messsage=err.message || "Internal Server Error!!!"
//     //wrong mongodb id error
//     if(err.name==="CastError"){
//         const message=`Resource not found :${err.path}`
//         err=new ErrorHandler(message,400)
//     }
//     //duplicate
//     if(err.code===11000){
//         const message=`Duplicate ${Object.keys(err.keyvalue)} Entered`;
//         err=new ErrorHandler(message,400)
//     }
//     //json webtoken error
//     if(err.name==="jsonWebTokenError"){
//         const message=`Invalid jwt token, try again!`
//         err=new ErrorHandler(message,400)
//     }
//     //json web toekn expired
//     if(err.name==="TokenExpiredError"){
//         const message=`Jwt has expired,try again`
//         err=new ErrorHandler(message,400)
//     }
//     res.status(err.statuscode).json({
//         success:false,
//         message:err.message
//     });
// }









