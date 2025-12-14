const appointmentRouter=require("express").Router()
const {authenticated, verifyRole }=require("../middlewares/auth.middleware")
const {postAppointment, getAppointment, deleteAppointment, updateAppointmentStatus }=require("../controllers/appointment.controller")

appointmentRouter.post("/",authenticated,postAppointment)
appointmentRouter.get("/",authenticated,verifyRole("ADMIN"),getAppointment)
appointmentRouter.delete("/:id",authenticated,verifyRole("ADMIN"),deleteAppointment)
appointmentRouter.put("/:id",authenticated,verifyRole("ADMIN"),updateAppointmentStatus)

module.exports=appointmentRouter
