const express = require("express");
const router = express.Router();

const {
     GetallMovies,
  GetSingleMovies,
} = require("../controllers/user")

router.route("/").get(GetallMovies);
router.route("/:id").get(GetSingleMovies);

module.exports = router

//* user routes for get all and single movie(s)