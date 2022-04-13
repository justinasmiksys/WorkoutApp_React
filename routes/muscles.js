const router = require("express").Router();

//imports the database model
let Muscle = require("../models/muscle.model");

//server response for the get request of /muscles/
//sends back all entries of Muscle model from the database
router.route("/").get((req, res) => {
  Muscle.find()
    .then((muscles) => res.json(muscles))
    .catch((err) => res.status(400).json("Error: " + err));
});

//server response for the post request of /muscles/add
//this is not accessible for a user
//used by admin in order to add new muscle group data of Muscle model
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const main_url = req.body.main_url;
  const sec_url = req.body.sec_url;

  const newMuscle = new Muscle({ name, main_url, sec_url });

  newMuscle
    .save()
    .then(() => res.json("New muscle added..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
