import React from "react";
import { useMiddle } from "../../contexts/MiddleDisplayContext";
import { useUser } from "../../contexts/UserContext";

export function WorkoutList({ userData }) {
  const { setSelectedWorkout } = useMiddle();
  const { setEditWorkoutState } = useUser();


  function handleWorkoutDetails(workout) {
    setSelectedWorkout(workout);
    setEditWorkoutState(false);
  }

  //renders the workout list
  //button sets the workout to be displayed in the middle
  return (
    <div>
      <ul className="list__list">
        {userData.workouts.map((workout) => (
          <li className="list__workout">
            <button style={{backgroundColor:workout.color}} onClick={() => handleWorkoutDetails(workout)}>
              {workout.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
