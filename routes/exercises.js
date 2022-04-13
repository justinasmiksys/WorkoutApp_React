const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//helper function, that transforms the name code from the request 
//to the actual name of the muscle group
//------------since the search and filter actions are handled at front end, this is not used

// const transformName = (name) => {
//   if (name === "ghp") return "Glutes & Hip Flexors";
//   if (name === "lb") return "Lower Back";
//   if (name === "mbl") return "Middle Back & Lats";
//   if (name === "ublt") return "Upper Back & Lower Lats";
//   return name;
// };

//server response for the get request of /exercises/
//sends all the entries of Exercise model from the database
//the received is used by the allExercises context provider at frontend
router.route("/").get((req, res) => {
  Exercise.find()
    .then((muscles) => res.json(muscles))
    .catch((err) => res.status(400).json("Error: " + err));
});

//server response for the get request of /exercises/search/:query
//where query is the input of the search bar
//sends back all entries of the Exercise model from the database,
//which contain the input query in the title of the Exercise object

//------------this is not used, since the search action is handled at frontend

// router.route("/search/:query").get((req, res) => {
//   Exercise.find({ title: { $regex: req.params.query, $options: "i" } })
//     .then((muscles) => res.json(muscles))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

//server response to the get request of /exercise/filter/:name,
//where name is the names of the checked radioboxes at the filter bar
//sends back all entries of the Exercise model from the database,
//which contain one of the checked boxes either in primary or in secondary 
//muscle group attribute of the Exercise object

//------------this is not used, since the filter action is handled at frontend

// router.route("/filter/:name").get((req, res) => {
//   const input = transformName(req.params.name);
//   Exercise.find({
//     $or: [{ primary: input }, { secondary: input }],
//   })
//     .then((muscles) => res.json(muscles))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
