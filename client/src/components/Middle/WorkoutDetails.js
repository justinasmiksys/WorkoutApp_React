import React from "react";
import { ExerciseDetails } from "./ExerciseDetails";
import { ExerciseDetailsWindow } from "./ExerciseDetailsWindow";
import { EditWorkout } from './EditWorkout'

import { useExDetails } from "../../contexts/ExerciseDetailsContext";
import { useMiddle } from "../../contexts/MiddleDisplayContext";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";


//takes a prop workout, which is a selected workout,
//coming form the workoutDetails provider and used in Middle component
export function WorkoutDetails({ workout }) {

  const { currentUser, setCurrentUser } = useAuth();

  const { title, exercises, color } = workout;

  const { clickedExercise } = useExDetails();
  const { selectedWorkout, setSelectedWorkout } = useMiddle();
  const { deleteWorkout, editWorkoutState, setEditWorkoutState } = useUser();


  //if button back is clicked, selected workout is set to null
  function handleBack() {
    setSelectedWorkout(false);
  }

  const handleEditWorkout = (e) => {
    e.preventDefault();
    setEditWorkoutState(true);
  }

  const handleDeleteWorkout = async (e) => {
    e.preventDefault();
    await deleteWorkout(selectedWorkout, currentUser.user);
    await setCurrentUser({user:currentUser.user});
    await setSelectedWorkout();
  }

  return (
    <>

    {/* if user clicks on the exercise in the workout, its rendered in the middle */}
      {clickedExercise &&
      <div className="popup-container">
        <ExerciseDetailsWindow {...clickedExercise} />
      </div>}

      {editWorkoutState ? <EditWorkout workout={selectedWorkout} /> :


      <div className="workout-details">

        <div className="workout-details__header">

        <button
          className="workout-details__btn-back"
          style={{backgroundColor:color}}
          onClick={handleBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="popup__header__btn--icon workout-details__btn-back__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
        </button>

        <div className="workout-details__title" style={{backgroundColor:color}}>{title}</div>

        </div>

        <div className="workout-details__exercise-list">

        {/* every exercise of the workout is rendered through details component */}
        {exercises.map((exercise,i) => (
          <ExerciseDetails
            data={exercise.exerciseData}
            setsList={exercise.setsList}
            color={color}
            key={i}
          />
        ))}

        </div>

        <button className="workout-form__btn" style={{backgroundColor:workout.color}} onClick={handleEditWorkout}>Edit</button>
        <button className="workout-form__btn" style={{backgroundColor:workout.color}} onClick={handleDeleteWorkout}>Delete</button>

      </div>
}

    </>
  );
}
