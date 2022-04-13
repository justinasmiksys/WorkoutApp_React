import React from "react";
import { ExerciseList } from "./ExerciseList";
import { Calendar } from "./Calendar"
import { WorkoutDetails } from "./WorkoutDetails";
import { useMiddle } from "../../contexts/MiddleDisplayContext";
import { useUser } from "../../contexts/UserContext";

import { BrowserRouter as Router, Switch} from "react-router-dom";
import { ProtectedRoute, GuestRoute } from "../ProtectedRoutes/ProtectedRoutes";

import profile from '../../img/profile.png'
import search from '../../img/search.png'

export const Middle = () => {
  //takes the selected workout state from the context provider
  const { selectedWorkout } = useMiddle();
  const { calendarState } = useUser();

  const handleAfter = () => {
    const sideRight = document.getElementsByClassName('sidebar-right')[0]
    sideRight.classList.add('visible')
  }

  const handleBefore = () => {
    const sideRight = document.getElementsByClassName('sidebar-left')[0]
    sideRight.classList.add('visible-left')
  }

  return (
    <div className="middle">
      <span className="middle-before" onClick={handleBefore}>
        <img src={search}></img>
      </span>
      {/* if the selected workout is non-null, workout details component is displayed */}
      {selectedWorkout ? (
        <WorkoutDetails workout={selectedWorkout} />
      ) : (
        // otherwise exercise list is displayed in the middle
        <div className="middle-container">
          <Router>
            <Switch>

            {calendarState ?
            <ProtectedRoute exact path="/profile" component={Calendar} /> :
            <ProtectedRoute exact path="/profile" component={ExerciseList} />}

            <GuestRoute path="/" component={ExerciseList} />
            </Switch>
          </Router>
        </div>
      )}

      <span className="middle-after" onClick={handleAfter}>
        <img src={profile}></img>
      </span>
    </div>
  );
};
