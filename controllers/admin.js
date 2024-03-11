//* ADMIN CURD OPERATION
const Movies = require("../models/movies")
const StatusCodes = require("http-status-codes");
const { CUSTOMERRORS } = require("../errors/customErrorhandler");


//* admin get all movies controller with filters
const AdminGetAllMovies = async (req, res) => {
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

    let result = Movies.find(queryObject);
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
}
//
//* admin get single movies controller
const AdminGetSingleMovies =  async(req, res) => {
  const movieID = req.params.id;
  const movielistApi = await Movies.findOne({
    _id: movieID,
  });
  if (!movielistApi) {
    throw new CUSTOMERRORS(`No transaction with id ${movieID}`);
  }
  res.status(StatusCodes.OK).json({ movielistApi });
};
//* admin  post new  movie controller
const AdminGetPostNewMovies = async(req, res) => {
 const movies = await Movies.create(req.body);
  res.status(StatusCodes.CREATED).json({ movies });
};
//* admin  Edit single movie controller
const AdminGetEditMovies = async(req, res) => {
  const movieID = req.params.id;
  const Updatesinglemovie = await Movies.findOneAndUpdate(
    { _id: movieID },
    req.body,
    { new: true, runValidators: true }
  );
  if (!Updatesinglemovie) {
    throw new CUSTOMERRORS(`No transaction with id ${movieID}`);
  }
  res.status(StatusCodes.CREATED).json({ message: "movie edited" });
};
//* admin Delete single movie controller
const AdminGetDeletMovies = async(req, res) => {
  const movieID = req.params.id;
    req.body.createdBy = req.user.decoded.userId;
    const Deletemovie = await Movies.findOneAndDelete({
      _id: movieID,
    });
     if (!Deletemovie) {
       throw new CUSTOMERRORS(`No transaction with id ${movieID}`);
     }
    res.status(StatusCodes.OK).json({ message: "Transaction Deleted" });
};

module.exports = {
  AdminGetAllMovies,
  AdminGetSingleMovies,
  AdminGetPostNewMovies,
  AdminGetEditMovies,
  AdminGetDeletMovies,
};