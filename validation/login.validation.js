const { body } = require("express-validator");
const { validationError }=require("../customError")

const loginValidation=[
    body("email")
    .notEmpty().withMessage("email is required"),
    body("password")
    .notEmpty().withMessage("password is required"),
   
   ]


module.exports=loginValidation