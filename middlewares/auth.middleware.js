const {UnAuthorizedError, ForbiddenError, BadRequestError}=require("../customError")
const JWT=require("jsonwebtoken");
const {Access_Token_Secret}=require("../config/env.config")
const User =require("../models/user.model")


const authenticated = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      throw new UnAuthorizedError("Authentication required");
    }

    const decode = JWT.verify(accessToken, Access_Token_Secret);

    const user = await User.findById(decode.id);
    if (!user) {
      throw new BadRequestError("User does not exist");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof JWT.JsonWebTokenError) {
      next(new ForbiddenError("Invalid access token"));
    } else if (error instanceof JWT.TokenExpiredError) {
      next(new ForbiddenError("Access token expired"));
    } else {
      console.log(`error in authentication middleware: ${error}`);
      next(error);
    }
  }
};



const verifyRole = (role) => {
  return (req, res, next) => {
    try {
      if (req.user?.role !== role) {
        throw new BadRequestError("Only admin can access this");
      }
      next();
    } catch (error) {
      console.log(`error in role base control middleware :: ${error}`);
      next(error);
    }
  };
};

module.exports={authenticated,verifyRole}