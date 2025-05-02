const { body } = require("express-validator");
const {validationError }=require("../customError")
const PatientValidation=[
    body("email")
    .isEmail().withMessage("invalid email")
    .notEmpty().withMessage("email is required"),
    body("firstName")
    .notEmpty().withMessage("first name is required")
    .trim(),
    body("lastName")
    .notEmpty().withMessage("last name is required")
    .trim(),
    body("nic")
    .notEmpty().withMessage("nic number is required")
    .isLength({min:13,max:13}).withMessage("nic number must be equal to 11 number")
    .trim(),
    body("phone")
    .notEmpty().withMessage("phone number is required")
    .isLength({min:11,max:11}).withMessage("phone number must be equal to 11 number")
    .trim(),
    body("dob")
    .notEmpty().withMessage("date of birth required")
    .isDate({format:"YYYY-MM-DD"}).withMessage("Invalid date format (YYYY-MM-DD)")
    .custom((value)=>{
        const dob=new Date(value)
        const today=new Date()
        if(dob >= today){
            throw new validationError("Date of birth must be in the past")
        }
        return true
    }),
    body("password")
        .notEmpty().withMessage("password is required")
        .isLength({min:8}).withMessage("password at least 8 character")
        .trim()
        ,
     body("confirmPassword")
    .notEmpty().withMessage("confirm password is required")
    .custom((value,{req})=>{
        if(value!==req.body.password){
            throw new validationError("passwords do not match")
        }
        return true
    }),
    body("gender")
    .notEmpty().withMessage("gender is  required")
    .isIn(["MALE","FEMALE"]).withMessage('Gender must be either MALE or FEMALE'),
    body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['PATIENT', 'DOCTOR']).withMessage('Invalid role specified'),
]
module.exports=PatientValidation