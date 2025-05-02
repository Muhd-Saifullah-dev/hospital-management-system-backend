const DB_NAME="hospital-management-system"
const CookieOption={
    httpOnly: true, 
  secure: process.env.NODE_ENV === 'production', 
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',

  get RefreshTokenOptions(){
    return {
        ...this,
        maxAge: 10 * 24 * 60 * 60 * 1000,  // 10 days expiry
    }
  },
  get accessTokenOptions() {
    return {
        ...this,
        maxAge:15 * 60 * 1000 //15 min
    }
  }
}
module.exports={DB_NAME,CookieOption}