const DB_NAME="hospital"
const CookieOption={
    httpOnly: true, 
  secure: process.env.NODE_ENV === 'production', 
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
}
module.exports={DB_NAME,CookieOption}