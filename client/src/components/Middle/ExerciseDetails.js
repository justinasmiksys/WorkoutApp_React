import React from "react";

import { useInitialData } from "../../contexts/InitialDataContext";
import { useDisplay } from "../../contexts/DisplayContext";
import { useExDetails } from "../../contexts/ExerciseDetailsContext";

export function ExerciseDetails({ data, setsList, color }) {
  const sets = setsList.join("x");
  const { allMuscles } = useInitialData();
  const { display } = useDisplay();

  const { setClickedExercise } = useExDetails();


  //this to be finished
  //the logic is the same as in exercise list
  function handleDetails(e) {

    try {
      const clickedTitle =
        e.target.parentNode.parentNode.firstChild.textContent;

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
  
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="workout-details__exercise">
      <div className="workout-details__exercise__title">{data.title}</div>
      <img
        className="workout-details__exercise__image"
        src={data.img_url}
        alt=""
      />
      <div className="sets-button">
        <p className="sets-button__title">Sets: {sets}</p>
        <button className="sets-button__details" style={{backgroundColor:color}} onClick={handleDetails}>
          Details
        </button>
      </div>
    </div>
  );
}
