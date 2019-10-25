const mongoose = require("mongoose");

//Create a movie schema, define data types for properties
const movieSchema = new mongoose.Schema({
  name: String,
  description: String,
  genre: [String],
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }], // Defining a relation to another mode
  isNominated: { type: Boolean, default: false },
  release: Number,
  imageUrl: String
});

//Create Movie model from movieSchema and Export Movie model
module.exports = mongoose.model("Movie", movieSchema);
