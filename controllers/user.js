//* USER GET ALL AND SINGLE MOVIE(S) FROM DB */
const MovielistApi = require("../models/movies");
const StatusCodes = require("http-status-codes");

//* user get all movies controller
const GetallMovies = async (req, res) => {
 const { NewMovie, genre, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (NewMovie) {
    queryObject.NewMovie = NewMovie === "true" ? true : false;
  }
  if (genre) {
    queryObject.genre = genre;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = MovielistApi.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2

  const allmovies = await result;
  res.status(200).json({ allmovies, lenght: allmovies.length });
};

//
//* user get single movie controller
const GetSingleMovies = async (req, res) => {
  const movieID = req.params.id;
  const movielistApi = await MovielistApi.findOne({
    _id: movieID,
  });
   if (!movielistApi) {
     throw new CUSTOMERRORS(`No transaction with id ${movieID}`);
   }
  res.status(StatusCodes.OK).json({ movielistApi });
};

module.exports = {
  GetallMovies,
  GetSingleMovies,
};
