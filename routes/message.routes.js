const express = require("express");
const messageRoute = express.Router();
const SendMessageValidation = require("../validation/sendMessage.validation");
const {
  validationMiddleware,
} = require("../middlewares/validation.middleware");
const { SendMessage } = require("../controllers/message.controller");

messageRoute.post(
  "/",
  SendMessageValidation,
  validationMiddleware,
  SendMessage
);

module.exports = messageRoute;
