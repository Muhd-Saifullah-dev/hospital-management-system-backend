const User=require("../models/user.model")
const {BadRequestError,UnAuthorizedError }=require("../customError")
const {okResponse }=require("../utils/Errorhandlers")
const { CookieOption } = require("../constant")


const patientRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, nic, dob, gender, role } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone || !nic || !dob || !gender) {
      throw new BadRequestError("All required fields must be provided");
    }
    
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
    
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();
    
    await newUser.setRefreshToken(refreshToken);

    res.cookie("access_token", accessToken, CookieOption.accessTokenOptions);
    res.cookie("refresh_token", refreshToken, CookieOption.RefreshTokenOptions);
    
    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    okResponse(res, 201, "User created successfully", userResponse, accessToken);
  } catch (error) {
    console.error(`Error in patient register: ${error.message}`);
    next(error);
  }
};

const login=async(req,res,next)=>{
   try {
     const {email,password}=req.body;
     let doesUser=await User.findOne({email}).select("+password +refreshToken")
     if(!doesUser){
         throw new BadRequestError("user is not exist")
     } 
     const matchPassword=await doesUser.comparePassword(password)
     if(!matchPassword){
         throw new UnAuthorizedError("invalid crediential")
     }
   
     const AccessToken= doesUser.generateAccessToken()
     const RefreshToken= doesUser.generateRefreshToken()
     await  doesUser.setRefreshToken(RefreshToken)
     const user=await doesUser.save()

     res.cookie("access_token",AccessToken,CookieOption.accessTokenOptions)
     res.cookie("refresh_token",RefreshToken,CookieOption.RefreshTokenOptions)

     okResponse(res,200,"user logged in successfully !!",user,{
         accessToken:AccessToken,
         refreshToken:RefreshToken
     })
   } catch (error) {
        console.log(`error in login function :: ${error}`)
        next(error)
   }
}

const logout=async(req,res,next)=>{
try {
    res.clearCookie("refresh_token")
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
         throw new BadRequestError("Admin with this email already exists")
     }
     const newAdmin=User.create({
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
     okResponse(res,201,"new admin created successfully !",newAdmin)
   } catch (error) {
    console.log(`error in addNewAdmin function :: ${error}`)
    next(error)
   }
}


const getAllDoctor=async(req,res,next)=>{
    const doctor=await User.find({role:"DOCTOR"})
    okResponse(r)
}
module.exports={patientRegister,login,addNewAdmin,logout}