const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const {
  Access_Token_Secret,
  Access_Token_Expiry,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = require("../config/env.config");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    select: false,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    trim: true,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE"],
    default: null,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "PATIENT", "DOCTOR"],
    default: null,
  },
  doctorDepart: {
    type: String,
  },
  docAvatar: {
    type: String,
    default: null,
  },
});

userSchema.add({
  refreshToken:{
    token: String,
    expireAt:{type:Date,
      index: { expires: 0 },
    },
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(16);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compareSync(password, this.password);
};

//  tokens methods
userSchema.methods.setRefreshToken = async function (token) {
  const expireAt = new Date();
  expireAt.setDate(expireAt.getDate() + 10);
  
  this.refreshToken = {
    token:token,
    expireAt:expireAt
  };
  await this.save()
};

userSchema.methods.clearRefreshToken = function () {
  this.refreshToken = undefined;
  return this.save();
};

userSchema.methods.generateAccessToken = function () {
  return JWT.sign(
    {
      id: this._id,
    },
    Access_Token_Secret,
    {
      expiresIn: Access_Token_Expiry,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return JWT.sign(
    {
      id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.hasValidRefreshToken = function (token) {
  return (
    this.refreshToken &&
    this.refreshToken.token === token &&
    new Date() < this.refreshToken.expireAt
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
