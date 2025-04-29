const { body } = require("express-validator");

const SendMessageValidation=[
    body("email")
    .isEmail().withMessage("invalid email")
    .notEmpty().withMessage("email is required"),
    body("firstName")
    .notEmpty().withMessage("first name is required")
    .trim(),
    body("lastName")
    .notEmpty().withMessage("last name is required"),
    body("message")
    .notEmpty().withMessage("message is required")
    .trim(),
    body("phone")
    .notEmpty().withMessage("phone number is required")
    .isLength({min:11,max:11}).withMessage("phone number must be equal to 11 number")
    .trim()
]
module.exports=SendMessageValidation