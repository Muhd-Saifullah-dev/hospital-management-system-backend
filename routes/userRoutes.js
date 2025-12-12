const express=require("express")
const { patientRegister, login } = require("../controllers/user.controller")
const userRoutes=express.Router()
const PatientValidation=require("../validation/patient.validation") 
const { validationMiddleware } = require("../middlewares/validation.middleware")
const loginValidation=require("../validation/login.validation")

userRoutes.post("/patient/register",PatientValidation,validationMiddleware,patientRegister)
userRoutes.post("/login",loginValidation,validationMiddleware,login)
module.exports=userRoutes