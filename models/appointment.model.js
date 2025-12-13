const mongoose = require("mongoose");



const appointmentSchema=new mongoose.Schema({
firstName:{
    type:String,
    required:true
},
lastName:{
     type:String,
    required:true
},
email:{
      type:String,
    required:true
},
phone:{
      type:String,
    required:true
},
nic:{
     type:String,
    required:true
},
dob:{
    type:Date,
    required:true
},
gender:{
 type:String,
    required:true,
    enum:["MALE","FEMALE"]
},
appointment_date:{
    type:String,
      required:true,
},

doctor:{
      firstName: {
      type: String,
      required:true,
    },
    lastName: {
      type: String,
      required: true,
    },
},
hasVisited:{
    type:Boolean,
    default:false
},
address:{
    type:String,
    required:true,
    trim:true
},
doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true
},
patientId:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
},
status:{
    type:String,
    enum:["Pending","Accepted","Rejected"],
    default:"Pending"
}
});
const Appointment=mongoose.model("Appointment",appointmentSchema)
module.exports=Appointment