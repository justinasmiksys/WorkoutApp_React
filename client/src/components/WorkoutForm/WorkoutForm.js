import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ExerciseField } from "./ExerciseField";
import { useInitialData } from "../../contexts/InitialDataContext";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { useWorkoutForm } from "../../contexts/WorkoutFormContext";
import { HexColorPicker } from "react-colorful";


export function WorkoutForm() {
  const { allExercises } = useInitialData();
  const { userData, addWorkout } = useUser();
  const { currentUser } = useAuth();
  const workoutTitleRef = useRef();
  const [colorState, setColorState] = useState(false);
  const [color, setColor] = useState("#212529");


  useEffect(() => {
    setExercises({ exercises: [<ExerciseField key={0} />] });
  }, []);

  const { exercises, setExercises } = useWorkoutForm();

  const history = useHistory();

  const ColorStateOn = () => {
    setColorState(true);
  }

  const ColorStateOff = () => {
    setColorState(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { 
      title: workoutTitleRef.current.value, 
      exercises: [], 
      color: color, 
      id:userData.workoutId 
    };

    let selectedExercises = Array.prototype.slice.call(
      document.querySelectorAll("#exercise-field__title")
    );
    
    selectedExercises = selectedExercises.filter(ex=>
      !ex.parentNode.classList.contains("hidden") &&
      ex.parentNode.parentNode.parentNode.parentNode.parentNode.className==="sidebar-right"
      )

    selectedExercises.map((exercise) => {
      const exerciseData = allExercises.data.find((exobj) => exobj._id === exercise.value);

      const sets = Array.prototype.slice.call(
        exercise.nextElementSibling.childNodes
      );

      const setsList = sets
      .filter((node) => node.className === "set-field")
      .map((node) => node.children[1].value);

      const exerciseObject = {
        exerciseData,
        setsList,
      };

      workout.exercises = [...workout.exercises, exerciseObject];
    });


    const response = await addWorkout(workout, currentUser.user);

    if (response.message === "Workout Added") history.push("/profile");
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    setExercises({
      exercises: [
        ...exercises.exercises,
        <ExerciseField key={exercises.exercises.length} />,
      ],
    });
  };

  return (
    <div className="workout-form">

      <div className="color-container">
        {
        colorState ? 
        <HexColorPicker className="color-picker" 
                      color={color}
                      onMouseEnter={ColorStateOn}
                      onMouseLeave={ColorStateOff}  
                      onChange={setColor} /> : 
        <div></div>
        }
      </div>


      <form onSubmit={handleSubmit}>

        <div className="workout-form__title-color">

        <input
          className="workout-form__title"
          type="text"
          placeholder="Title"
          ref={workoutTitleRef}
        />

        <div 
        className="color-box" 
        style={{backgroundColor:color}} 
        onMouseEnter={ColorStateOn}
        onMouseLeave={ColorStateOff}>
        Marker</div>
        
        </div>

        <div className="workout-form__exercises">
          {exercises ? (
            exercises.exercises.map((exercise) => (
              <div className="exercise-field">{exercise}</div>
            ))
          ) : (
            <p>rendering</p>
          )}
        </div>

        <button className="workout-form__btn" onClick={handleAddExercise}>
          Add exercise
        </button>

        <button className="workout-form__btn">Save</button>
        <button className="workout-form__btn" onClick={() => history.push("profile")}>Back</button>

      </form>
    </div>
  );
}
