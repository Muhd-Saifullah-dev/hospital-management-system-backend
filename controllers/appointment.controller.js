const User=require("../models/user.model")
const { BadRequestError}=require("../customError");
const Appointment = require("../models/appointment.model");
const {okResponse }=require("../utils/Errorhandlers");
const {pagination}=require("../utils/pagination")



const postAppointment=async(req,res,next)=>{
    try {
    const { 
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address}=req.body;

    const isConflict=await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"DOCTOR",
        doctorDepartment:department
    })

    if(isConflict.length===0){
        throw new BadRequestError("doctor not found")
    }
    if(isConflict.length>1){
        throw new BadRequestError("Doctors Conflict! Please Contact Through Email Or Phone!")
    }

    const doctorId=isConflict[0]._id
    const patientId=req.user.id

    const appointment=await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor:{
            firstName:doctor_firstName,
            lastName:doctor_lastName
        },
        hasVisited,
        address,
        doctorId,
        patientId

    });
    okResponse(res,200,"appointment send",appointment)

    } catch (error) {
        console.log(`error in post appointment :: ${error}`)
        next(error)
    }
}

const updateAppointmentStatus=async(req,res,next)=>{
  try {
      const {id}=req.params
      let appointment=await Appointment.findById(id)
      if(!appointment){
          throw new BadRequestError("appointment not found")
      }
      appointment=await Appointment.findByIdAndUpdate(id,req.body,{
          new:true})
      okResponse(res,200,"Appointment status updated")
  } catch (error) {
    console.log(`error in updated appointment status`)
    next(error)
  }
}

const deleteAppointment=async(req,res,next)=>{
    try {
        const {id}=req.params
        let appointment=await Appointment.findById(id)
        if(!appointment){
            throw new BadRequestError("Appointment not found")
        }
        await appointment.deleteOne()
        okResponse(res,200,"appointment deleted successfully")
    } catch (error) {
        console.log(`error in deleted appointment :: ${error}`)
        next(error)
    }
}


const getAppointment=async(req,res,next)=>{
  try {
      const {page,skip,limit}=await pagination(req)
      const appointment=await Appointment.find().skip(skip).limit(limit)
      if(!appointment || appointment.length===0){
          throw new BadRequestError("appointment not found")
      }
      const totalRecord=await Appointment.countDocuments()
      const totalPage=Math.ceil(totalRecord/limit)
      okResponse(res,200,"all appointment fetch sucessfully ",{appointment,pagination:{
          page,
          skip,
          limit,
          totalPage,
          totalRecord
      }})
  } catch (error) {
    console.log(`error in get appointment :: ${error}`)
    next(error)
  }
}

module.exports={
    postAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    getAppointment
}