const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { Access_Token_Secret,Access_Token_Expiry }=require("../config/env.config")
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
}, 
lastName:{
        type:String,
        required:true
},
 email:{
        type:String,
        required:true
},
password:{
    type:String,
    required:true,
    select:false
},
 phone:{
        type:String,
        required:true
},
 nic:{
        type:String,
        required:true
},
dob:{
    type:Date,
    required:true
},

gender:{
    type:String,
    required:true,
    enum:["MALE","FEMALE"]

},
role:{
    type:String,
    required:true,
    enum:["ADMIN","PATIENT","DOCTOR"]
},  
doctorDepartment:{
    type:String
},
docAvatar:{
    public_id:String,
    url:String,
    
}
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
})
userSchema.methods.compare_password=async function(userpassword){
    return await bcrypt.compare(userpassword,this.password)
}

userSchema.methods.generate_access_token=async function () {
    return await jwt.sign({id:this._id},Access_Token_Secret,{
        expiresIn:Access_Token_Expiry
    })
}

const User=mongoose.model("User",userSchema)
module.exports=User