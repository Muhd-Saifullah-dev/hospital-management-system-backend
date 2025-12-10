const dotenv=require("dotenv")
const path=require("path")



dotenv.config({
    path:path.resolve(__dirname,"../.env")
})
console.log(process.env.TOKEN_SECRET_KEY)
console.log(process.env.EXPIRE_DATE,)
console.log(process.env.REFRESH_TOKEN_SECRET)
module.exports={
    PORT:process.env.PORT || 3000,
    MONGO_URI:process.env.MONGO_URI,
    Access_Token_Secret:process.env.TOKEN_SECRET_KEY,
    Access_Token_Expiry:process.env.EXPIRE_DATE,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY
}