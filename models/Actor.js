const mongoose = require("mongoose");
const actorSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birthDate: Date,
  hasOscar: { type: Boolean, default: false },
  gender: { type: String, enum: ["female", "male"] } // Enum properties can only have the specified values with the specified data type
});

//Create Movie model from movieSchema and Export Movie model
module.exports = mongoose.model("Actor", actorSchema);
