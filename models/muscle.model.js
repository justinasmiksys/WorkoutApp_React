const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//creates a model for the database entries of the Muscle
const muscleSchema = new Schema({
  name: { type: String, required: true },
  main_url: { type: String, required: true },
  sec_url: { type: String, required: true },
});

const Muscle = mongoose.model("Muscle", muscleSchema);

module.exports = Muscle;
