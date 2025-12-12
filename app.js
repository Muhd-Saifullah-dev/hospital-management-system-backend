const express = require('express');
const cookieParser=require("cookie-parser")
const globalMiddleware = require('./middlewares/globalMiddleware');
const app = express();
const ReqResInspector=require("express-req-res-inspector")
const rootRouter=require("./routes/root.routes")

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser())
app.use("/api/v1",rootRouter)

// add routes

app.get("/health-check",(req,res)=>{
    return res.status(200).json({
        success:true,
        data:null,
        message:"server is running "
    })
})

app.use(ReqResInspector()); 

// Middleware
app.use(globalMiddleware)



module.exports = app;