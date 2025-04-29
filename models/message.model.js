const mongoose=require("mongoose")

const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },

     lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        trim:true,
        required:true
    }
})

const Message=mongoose.model("Message",messageSchema)

module.exports=Message