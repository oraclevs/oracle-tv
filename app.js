//? requirements
require("express-async-errors");
require("dotenv").config();

//? extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
//
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const errorHandlerMiddleware = require("./middlewares/errorhandler");
const ConectDB = require("./db/conect db");
const UserRoute = require("./routes/user");
const AdminRoute = require("./routes/admin");
const AdminauthRoute = require("./routes/admin_auth");
const NotFound = require("./middlewares/not_found");
const AuthMiddleware = require("./middlewares/admin_authmiddleware");

//? middlewares
// app.set("trust proxy", 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );
app.use(express.json()); //* {express}
// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
      "frame-src": ["'self'", "https: data:"],
    },
  })
);
app.use(cors());
app.use(xss());
app.use(express.static("public"))

//? Routes
app.use("/movies/v1", UserRoute); //* movie routes for users
app.use("/admin/v1/", AuthMiddleware, AdminRoute); //* admin routes for admin
//* admin auth routes
app.use("/admin/auth/v1", AdminauthRoute);

//! NotFound middleware
app.use(NotFound);
//! error handler middleware {custom}
app.use(errorHandlerMiddleware);

//?  DB and Port Engine
const startServer = async () => {
  await ConectDB(process.env.MONGO_URL);
  await app.listen(PORT, () => {
    console.log("port listening on port  3000");
  });
};

startServer(); //* start server
