const messageRoute=require("./message.routes")
const express=require("express")
const rootRouter=express.Router()

rootRouter.use("/send-message",messageRoute)



module.exports=rootRouter