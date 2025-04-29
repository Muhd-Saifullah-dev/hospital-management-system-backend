const Message=require("../models/message.model")
const { okResponse } = require("../utils/Errorhandlers")



const SendMessage=async(req,res,next)=>{
    try {
        const {message,email,phone,firstName,lastName}=req.body
        await Message.create({
            firstName,
            lastName,
            email,
            phone,
            message
        })
        okResponse(res,200,"send message successfully",null)
    } catch (error) {
        console.log(`error in sendMessage function :: ${error}`)
        next(error)
    }
}

module.exports={
    SendMessage
}