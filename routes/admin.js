const express = require("express");
const router = express.Router();
const {
  AdminGetAllMovies,
  AdminGetSingleMovies,
  AdminGetPostNewMovies,
  AdminGetEditMovies,
  AdminGetDeletMovies,
} = require("../controllers/admin");

router.route("/").get(AdminGetAllMovies).post(AdminGetPostNewMovies);
router
  .route("/:id")
  .get(AdminGetSingleMovies)
  .patch(AdminGetEditMovies)
  .delete(AdminGetDeletMovies);

module.exports = router;

//* admin routes for CURD operations