const Message=require("../models/message.model")
const { okResponse } = require("../utils/Errorhandlers")
const {pagination}=require("../utils/pagination")
const {BadRequestError }=require("../customError")

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

const getAllMessage=async(req,res,next)=>{
    try {
        const {page,limit,skip}=await pagination(req)
        const messages=await Message.find().skip(skip).limit(limit)
        if(!messages || messages.length===0){
            throw new BadRequestError("message not found")
        }
        const totalRecord=await Message.countDocuments();
        const totalPage=Math.ceil(totalRecord/limit)

        okResponse(res,200,"all messages fetch successfully",{messages,pagination:{
            page,
            skip,
            limit,
            totalRecord,
            totalPage
        }})
    } catch (error) {
        console.log(`error in get All msg `)
        next(error)
    }
}
module.exports={
    SendMessage,
    getAllMessage
}