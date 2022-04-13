const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creates a model for the database entries of the Exercise
const exerciseSchema = new Schema({
  title: { type: String, required: true },
  equipment: { type: String, required: true },
  primary: { type: Array, required: true },
  secondary: { type: Array, required: true },
  description: { type: Array, required: true },
  img_url: { type: String, required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
