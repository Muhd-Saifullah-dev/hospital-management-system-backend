const messageRoute=require("./message.routes")
const userRoutes=require("./userRoutes")
const express=require("express")
const rootRouter=express.Router()

rootRouter.use("/send-message",messageRoute)
rootRouter.use("/user",userRoutes)


module.exports=rootRouter