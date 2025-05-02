const {UnAuthorizedError, ForbiddenError, BadRequestError}=require("../customError")
const JWT=require("jsonwebtoken");
const {Access_Token_Secret}=require("../config/env.config")
const User =require("../models/user.model")


const authenticated=async(req,res,next)=>{
    try {
    const accessToken=req.cookies.access_token
    
   if(!accessToken){
    throw new UnAuthorizedError("Authentication required")
   }
   
   const decode=JWT.verify(accessToken,Access_Token_Secret)
   
    let usermiddleware=await User.findById(decode.id)
    console.log("decoded id :: ",decode.id)
   if(!usermiddleware){
    throw new BadRequestError("user does not exist")
   }
   req.user=usermiddleware
   next()
  
   } catch (error) {
    if(error instanceof JWT.JsonWebTokenError()){
        next(new ForbiddenError("Invalid access token"));
    }
    else if(error instanceof JWT.TokenExpiredError){
        next (new ForbiddenError("acces token expired"))
    }else{
    console.log(`erorr in authentication middleware ${error}`)
    next(next)
}
   }
}


const verifyAdmin=async(req,res,next)=>{
    try {
        if(req.user?.role !== "ADMIN"){
            throw new BadRequestError("Only admin can access this")
        }
        next()
       
    } catch (error) {
        console.log(`error in verify admin :: ${error}`)
        next(error)
    }
}
module.exports={authenticated,verifyAdmin}