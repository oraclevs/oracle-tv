const mongoose = require("mongoose");

const ConectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = ConectDB;
