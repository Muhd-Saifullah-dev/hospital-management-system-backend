const express = require("express");
const messageRoute = express.Router();
const SendMessageValidation = require("../validation/sendMessage.validation");
const {
  validationMiddleware,
} = require("../middlewares/validation.middleware");
const { SendMessage, getAllMessage } = require("../controllers/message.controller");
const {authenticated,verifyRole}=require("../middlewares/auth.middleware")
messageRoute.post(
  "/",
  SendMessageValidation,
  validationMiddleware,
  SendMessage
);
messageRoute.get("/",authenticated,verifyRole("ADMIN"),getAllMessage)

module.exports = messageRoute;
