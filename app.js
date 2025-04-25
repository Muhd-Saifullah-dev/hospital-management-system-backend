const express=require("express")
const app=express()
const ReqResInspector=require("express-req-res-inspector")

app.use(ReqResInspector())




module.exports=app