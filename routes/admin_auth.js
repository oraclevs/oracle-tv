const express = require("express");
const router = express.Router();
const {
 
  AdminLogin,
  AdminSignup,
} = require("../controllers/admin auth");


router.post("/admin/register", AdminSignup); // register
router.post("/admin/login", AdminLogin); // login

module.exports = router;


//* admin login and register routes 