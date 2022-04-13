import React, { useEffect} from "react";
import { useInitialData } from "../../contexts/InitialDataContext";
import { useDisplay } from "../../contexts/DisplayContext";
import { ExerciseDetailsWindow } from "./ExerciseDetailsWindow";

import { useExDetails } from "../../contexts/ExerciseDetailsContext";


//single exercise component in the list
//handleClick function is defined in the ExerciseList component
const Exercise = ({ exercise, handleClick }) => {
  return (
    <div className="exercise" onClick={handleClick}>
      <h2 className="exercise__header">{exercise.title}</h2>
      <img
        className="exercise_img"
        src={exercise.img_url}
        alt={exercise.title}
      />
    </div>
  );
};

export function ExerciseList() {
  const { allMuscles } = useInitialData();
  const {display} = useDisplay();

  const { clickedExercise, setClickedExercise } = useExDetails();

  useEffect(() => {
    const btn = document.querySelectorAll(".profile__btn")[0]
    const sideLeft = document.getElementsByClassName('sidebar-left')[0]

    if (btn){
      btn.classList.add("profile__btn--active")
      sideLeft.classList.remove('invisible')
    }

    return function cleanup() {
      const btn = document.querySelectorAll(".profile__btn")[0]
      const sideLeft = document.getElementsByClassName('sidebar-left')[0]

      if (btn){
        btn.classList.remove("profile__btn--active")
        sideLeft.classList.add('invisible')
      }

     }
   }, []);


  //sets a clicked exercise, which then is rendered in
  //ExerciseDetailsWindow
  const handleClick = (e) => {
    try {
      const clickedTitle = e.target.textContent || e.target.alt;
      const clickedExerciseObject = display.data.find(
        (exercise) => exercise.title === clickedTitle
      );

      const primary_img = clickedExerciseObject.primary.map((prime_muscle) => {
        const prime_muscle_object = allMuscles.data.find(
          (muscle) => muscle.name === prime_muscle
        );
        return prime_muscle_object.main_url;
      });

      const secondary_img = clickedExerciseObject.secondary.map(
        (sec_muscle) => {
          const sec_muscle_object = allMuscles.data.find(
            (muscle) => muscle.name === sec_muscle
          );
          return sec_muscle_object.sec_url;
        }
      );

      setClickedExercise({
        ...clickedExerciseObject,
        primary_img,
        secondary_img,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //renders an ExerciseDetailsWindow component with hidden class
  //or list of exercise list of Exercise components
  return (
    <>

      {
      clickedExercise ?

      <div className="popup-container">
        <ExerciseDetailsWindow {...clickedExercise} />
      </div> :

      <div className="container-exercises">
        {display &&
          display.data.map((exercise) => (
            <Exercise
              key={exercise._id}
              exercise={exercise}
              handleClick={handleClick}
            />
          ))}
      </div>
      }
    </>
  );
}
