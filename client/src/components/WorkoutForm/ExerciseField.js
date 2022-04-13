import React, { useState, useRef } from "react";
import { useInitialData } from "../../contexts/InitialDataContext";

function SetField({initial}) {

  return <input className="set-field__input" type="number" defaultValue={initial} />;
}

export function ExerciseField({selected}) {
  const selectedOption = useRef();
  const { allExercises } = useInitialData();


  if(!selected || !selected.exerciseData) selected=false

  const initialSets = selected && selected.setsList


  const [sets, setSets] = useState( selected ?
                                   { state: initialSets.map(set=> <SetField key={0} initial={set} />)} :
                                   { state: [<SetField key={0} initial={0}/>]}
                                   );


  allExercises.data.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));


  function removeExercise(e) {
    e.preventDefault();

    let selectedExercise = e.target.parentNode.parentNode
    if (selectedExercise.nodeName==="BUTTON") selectedExercise = selectedExercise.parentNode
    selectedExercise.classList.toggle("hidden");
  }

  function removeSet(e) {
    e.preventDefault();
    let selectedSet = e.target.parentNode.parentNode
    if (selectedSet.nodeName==="BUTTON") selectedSet = selectedSet.parentNode
    selectedSet.classList.toggle("hidden");
  }

  function handleAddSet(e) {
    e.preventDefault();

    const oldSets = sets.state;
    setSets({ state: [...oldSets, <SetField key={oldSets.length} initial={0} />] });
  }

  return (
    <>
      <button className="exercise-field__btn-esc" onClick={removeExercise}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="exercise-field__btn-esc__icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <select
        id="exercise-field__title"
        name="exercises"
        ref={selectedOption}
      >
        {allExercises.data.map((exercise) => (
          selected && exercise._id===selected.exerciseData._id ? 
          <option selected="selected" value={exercise._id}>{exercise.title}</option> : 
          <option value={exercise._id}>{exercise.title}</option>
        ))}
      </select>

      <div className="sets">
        {sets ? (
          sets.state.map((set, index) => (
            <div className="set-field">
              <p>Reps: </p>
              {set}
              <button className="set-field__btn-remove" onClick={removeSet}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="set-field__btn-remove__icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
        <button className="set-field__btn-add" onClick={handleAddSet}>
          add set
        </button>
      </div>
    </>
  );
}
