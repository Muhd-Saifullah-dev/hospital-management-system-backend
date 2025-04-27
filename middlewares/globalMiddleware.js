
const { handleError } = require("../utils/Errorhandlers")

const globalMiddleware=(err,req,res,next)=>{
    const message=err.message ?? "something went wrong"
    const status=err.status ?? 500
  return   handleError(res,status,message,null)
}

module.exports=globalMiddleware