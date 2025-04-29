const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(16);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.comparePassword=async function(password){
    return bcrypt.compareSync(password,this.password)
}

userSchema.methods.generateToken=async function(){

}

const User = mongoose.model("User", userSchema);

module.exports = User;
