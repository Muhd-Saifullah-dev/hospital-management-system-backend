const express=require("express")
const { patientRegister } = require("../controllers/user.controller")
const userRoutes=express.Router()

userRoutes.post("/patient/register",patientRegister)

module.exports=userRoutes