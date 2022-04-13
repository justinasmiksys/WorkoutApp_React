import React, {useEffect, useRef, useState} from "react";
import { useUser } from "../../contexts/UserContext";
import { ExerciseField } from "../WorkoutForm/ExerciseField";
import { useInitialData } from "../../contexts/InitialDataContext";
import { useMiddle } from "../../contexts/MiddleDisplayContext";
import { useExDetails } from "../../contexts/ExerciseDetailsContext"
import { useAuth } from "../../contexts/AuthContext";
import { HexColorPicker } from "react-colorful";



export function EditWorkout({workout}) {
    const { allExercises } = useInitialData();
    const { currentUser, setCurrentUser } = useAuth();
    const { clickedExercise, setClickedExercise } = useExDetails();

    const { selectedWorkout, setSelectedWorkout } = useMiddle();
    const { setEditWorkoutState, editWorkout } = useUser();
    const workoutTitleRef = useRef();

    const [exercises, setExercises] = useState(
      clickedExercise ? {list:[...workout.exercises, 
        {exerciseData:clickedExercise, 
          setsList:["0"]}
        ]}  :
        {list:[...workout.exercises]})

    const [colorState, setColorState] = useState(false);
    const [color, setColor] = useState(selectedWorkout.color);



    useEffect(() => {
        document.querySelector(".workout-form__title").value = workout.title
        setClickedExercise();
      }, []);

    const ColorStateOn = () => {
        setColorState(true);
      }
    
    const ColorStateOff = () => {
        setColorState(false);
      }

    const handleBack = () => {
        setEditWorkoutState(false)
    }

    const handleAddExercise = (e) => {
        e.preventDefault();
        setExercises({list:[...exercises.list, <ExerciseField />]})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        

    const updatedWorkout = { 
      title: workoutTitleRef.current.value, 
      exercises: [], 
      color:color, 
      id:selectedWorkout.id 
    };

    let selectedExercises = Array.prototype.slice.call(
      document.querySelectorAll("#exercise-field__title")
    );
    
    selectedExercises = selectedExercises.filter(ex=>
      !ex.parentNode.classList.contains("hidden") &&
      ex.parentNode.parentNode.parentNode.parentNode.parentNode.className==="middle"
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

      updatedWorkout.exercises = [...updatedWorkout.exercises, exerciseObject];
    });

    await editWorkout(updatedWorkout, selectedWorkout, currentUser.user);
    await setCurrentUser({user:currentUser.user});
    await setSelectedWorkout(updatedWorkout);
    await setClickedExercise();
    await handleBack()
    }

    return (<>

        

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


        <div className="workout-edit__title-color">


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
                 {exercises.list.map(ex=><div className="exercise-field"><ExerciseField selected={ex} /></div>)}
            </div>


        <button className="workout-form__btn" onClick={handleAddExercise}>Add Exercise</button>
        <button className="workout-form__btn" >Update</button>
        <button className="workout-form__btn" onClick={handleBack}>Back</button>
        </form>

        </div>
    </>)
}