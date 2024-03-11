const { CUSTOMERRORS } = require("../errors/customErrorhandler");
const { StatusCodes } = require("http-status-codes");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

//! Admin login control
const AdminLogin = async (req,res) => {
 const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new CUSTOMERRORS("Invalid Credentials");
  }
  //* compare password
  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CUSTOMERRORS("Invalid Credentials");
  }
//* creating a new admin jwt token
  const token = admin.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: admin.fullName }, token });
}
//! Admin register control
const AdminSignup =  async(req,res) => { 
// const admin = await Admin.create({ ...req.body });
//   const token = admin.createJWT();
//      res.json({ user: admin, token: token });
 throw new CUSTOMERRORS("Not authorized to create Admin account",StatusCodes.UNAUTHORIZED);
}

module.exports = {
  AdminLogin,
  AdminSignup,
};