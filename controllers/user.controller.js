const User=require("../models/user.model")
const {BadRequestError,UnAuthorizedError }=require("../customError")
const {okResponse }=require("../utils/Errorhandlers")
const { CookieOption } = require("../constant")
const {pagination}=require("../utils/pagination")

const patientRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, nic, dob, gender, role } = req.body;
    

    
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("User already exists!");
    }
   
   const newUser = await User.create({
      firstName,
      lastName,
      email,
      password, // Will be hashed by pre-save hook
      phone,
      nic,
      dob,
      gender,
      role: role || "PATIENT"
    });
    
    const accessToken = await newUser.generate_access_token();
   
    res.cookie("access_token", accessToken,CookieOption);
    const userResponse=newUser.toObject()
    delete userResponse.password
    
    okResponse(res, 201, "User created successfully", userResponse, accessToken);
  } catch (error) {
    console.error(`Error in patient register: ${error.message}`);
    next(error);
  }
};

const login=async(req,res,next)=>{
   try {
     const {email,password,role}=req.body;
     let doesUser=await User.findOne({email}).select("+password")
     if(!doesUser){
         throw new BadRequestError("user is not exist")
     } 
     const matchPassword=await doesUser.compare_password(password)
     if(!matchPassword){
         throw new UnAuthorizedError("invalid crediential")
     }
     if(role !==doesUser.role){
      throw new UnAuthorizedError("user with this role not found")
     }
     const AccessToken=await  doesUser.generate_access_token()


     const userResponse=doesUser.toObject()
     delete userResponse.password

     res.cookie("access_token",AccessToken, CookieOption )


     okResponse(res,200,"user logged in successfully !!",userResponse,AccessToken)
   } catch (error) {
        console.log(`error in login function :: ${error}`)
        next(error)
   }
}

const logout=async(req,res,next)=>{
try {

    res.clearCookie("access_token")
    okResponse(res,200,"user logged out successfully")
} catch (error) {
    console.log(`error in logout function :: ${error}`)
    next(error)
}
}


const addNewAdmin=async(req,res,next)=>{
   try {
    const { firstName, lastName,email,password,phone,nic,dob,gender}=req.body
     let admin=await User.findOne({email})
     if(admin){
         throw new BadRequestError(`${admin.role} Admin with this email already exists`)
     }
     const newAdmin=await User.create({
    firstName,
     lastName,
     email,
     password,
     phone,
     nic,
     dob,
     gender,
     role:"ADMIN"
     })
     const adminResponse=newAdmin.toObject()
     delete adminResponse.password
     okResponse(res,201,"new admin created successfully !",adminResponse)
   } catch (error) {
    console.log(`error in addNewAdmin function :: ${error}`)
    next(error)
   }
}


const getAllDoctor=async(req,res,next)=>{
 
try {
    const {page,limit,skip }= pagination(req) 
  
    const doctors=await User.find({role:"DOCTOR"})
    .skip(skip)
    .limit(limit)
     
      const totalRecord=await User.countDocuments({role:"DOCTOR"})
       if(!doctors || doctors.length===0){
        throw new BadRequestError("no doctor found ")
      }
      const totalPage=Math.ceil(totalRecord/limit)
  okResponse(res,201,"all doctor fetch successfully!",{doctors,pagination:{
     page,
      limit,
      totalRecord,
      totalPage,
  }})
} catch (error) {
   console.log(`error in getAllDoctor :: ${error}`);
    next(error);
}
}

const getProfileme=async(req,res,next)=>{
 try {
   const user=await User.findById(req.user?.id)
   okResponse(res,200,"get user detail successfully !!",user)
 } catch (error) {
  console.log(`error in get user detail :: ${error}`)
  next(error)
 }

}
module.exports={patientRegister,login,addNewAdmin,logout,getAllDoctor,getProfileme}