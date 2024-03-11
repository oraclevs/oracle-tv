//* movie schema for all movies in the database

const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "input the movie Name"],
    maxlength: 120,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "input the movie Description"],
  },
  Storyline: {
    type: String,
    required: [true, "input the movie Storyline"],
  },
  Cast: {
    type: String,
    required: [true, "input the movie Cast"],
  },
  Writers: {
    type: String,
    required: [true, "input the movie Writer/Writers"],
  },
  Year_of_Release: {
    type: String,
    required: [true, "input the movie year of release"],
  },
  video_Download_Link: {
    type: String,
    required: [true, "input the movie Download Link"],
  },
  image_source_potrate_url: {
    type: String,
    required: [true, "input the movie image source url for potrate photo"],
  },
  image_source_landscape_url: {
    type: String,
    required: [true, "input the movie image source url for landscape photo"],
  },
  movie_thriller_youtube_iframe_src_url: {
    type: String,
    required: [true, "input the movie thriller youtube iframe src url"],
  },
  genre: {
    type: String,
    required: [true, "input the movie Download Link"],
  },
  rating: {
    type: Number,
    required: [true, "input the movie rating number(stars)"],
  },
  review: {
    type: Number,
    required: [true, "input the movie review number"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Movies", MovieSchema);