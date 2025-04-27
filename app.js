const express = require('express');
const globalMiddleware = require('./middlewares/globalMiddleware');
const app = express();
const ReqResInspector=require("express-req-res-inspector")
// Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

// add routes


app.use(globalMiddleware)
module.exports = app;