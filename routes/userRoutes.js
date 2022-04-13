const router = require("express").Router();
const User = require("../models/user.model");


//server response to the get request of the /profile/:id,
//where id is the user id in the database
//sends back the user email and the workout list
router.route("/profile/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) =>
      res.status(200).json({ 
        email: user.email, 
        workouts: user.workouts, 
        workoutId:user.workoutId, 
        events:user.events,
        eventId:  user.eventId
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});


//server response to the post request of the /addworkout
//updates the User entry in the database by adding a new workout,
//which data was received inside the request
router.route("/addworkout").post((req, res) => {
  console.log("add workout post request received: ", req.body);
  User.updateOne(
    { _id: req.body.user },
    { $inc: {"workoutId":1}, $push: { workouts: req.body.workout }, multi:true}
  )
    .then((user) => res.status(200).json({ message: "Workout Added" }))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/editworkout").post((req, res) => {
  console.log("edit workout post request received: ", req.body);
  User.updateOne(
    { _id: req.body.user }, 
     {
       "$set":{
         "workouts.$[workout]":req.body.newWorkout,
          "events.$[event].title": req.body.newWorkout.title, 
          "events.$[event].backgroundColor": req.body.newWorkout.color 
        }
     },
     { 
      "arrayFilters": [
        { "workout.id": req.body.oldWorkout.id },
        { "event.id": req.body.oldWorkout.id }
      ], 
      "multi": true 
    }
  )
    .then((user) => res.status(200).json({ message: "Workout Edited" }))
    .catch((err) => res.status(400).json("Error: " + err));
});



router.route("/deleteworkout").post((req, res) => {
  console.log("delete workout post request received: ", req.body);
  User.updateOne(
    { _id: req.body.user },
    { 
      $pull: { 
        workouts: {id:req.body.workout.id},
        events: {id:req.body.workout.id}
      } 
    },
    {
      "multi": true
    }
  ).then((user) => res.status(200).json({ message: "Workout Deleted" }))
  .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/addevent").post((req, res) => {
  console.log("add event post request received: ", req.body);
  User.updateOne(
    { _id: req.body.user },
    {  $inc: { "eventId":1 }, $push: { events: req.body.event }, multi:true }
  )
    .then((user) => res.status(200).json({ message: "Event Added" }))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/removeevent").post((req, res) => {
  console.log("remove event post request received: ", req.body);
  User.updateOne(
    { _id: req.body.userId },
    { $pull: { events: { eventId:req.body.eventId } }}
  )
    .then((user) => res.status(200).json({ message: "Event Added" }))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
