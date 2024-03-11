const jwt = require("jsonwebtoken");
const { CUSTOMERRORS } = require("../errors/customErrorhandler");
const { jwtDecode } = require("jwt-decode");

const auth = async (req, res, next) => {
  //* check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CUSTOMERRORS("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWTSECRET);
    //* Decode token and  attach the admin to the admin routes
    const decoded = jwtDecode(token);
    req.user = {
      decoded,
    };
    next();
  } catch (error) {
    throw new CUSTOMERRORS(error);
  }
};

module.exports = auth;

//* admin authentication middle for verifying the jwt token