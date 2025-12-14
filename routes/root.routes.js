const appointmentRouter = require("./appointment.routes")
const messageRoute=require("./message.routes")
const userRoutes=require("./userRoutes")
const express=require("express")
const rootRouter=express.Router()

rootRouter.use("/message",messageRoute)
rootRouter.use("/user",userRoutes)
rootRouter.use("/appointment",appointmentRouter)



rootRouter.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});
module.exports=rootRouter