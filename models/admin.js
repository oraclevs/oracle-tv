
//* admin authentication schema  registration and login
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "please provide your full name"],
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide your email address"],
    minlength: 5,
    maxlength: 50,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: [true, "please provide a valid password"],
  },
});

//* pre save hash function
AdminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//* custom schema function to generate JWT token
AdminSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      Username: this.fullName,
    },
    process.env.JWTSECRET,
    {
      expiresIn: process.env.JWTLIFETIME,
    }
  );
};

//* Compare passwords
AdminSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Admin", AdminSchema);
