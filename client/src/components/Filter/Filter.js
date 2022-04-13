import React from "react";
import { useDisplay } from "../../contexts/DisplayContext";
import { useInitialData } from "../../contexts/InitialDataContext";
import { intersection } from "lodash";

const RadioButton = ({ muscle }) => {
  return (
    <div className="filter-bar__option">
      <input
        className="filter-bar__option__checkbox"
        type="checkbox"
        id={muscle._id}
      />
      <label className="filter-bar__option__label" htmlFor={muscle._id}>
        <span className="filter-bar__option__button"></span>
        {muscle.name}
      </label>
    </div>
  );
};

export const FilterBar = () => {
  const {allMuscles, allExercises} = useInitialData();
  const { setDisplay } = useDisplay();


  //function that filters the exercises based on the buttons checked
  const filterExercises = (btnsSelected) => {
    if (btnsSelected.length === 0) return;

    //finds the exercises which contain any checked muscle
    //in either primary of secondary muscle list
    const filterResults = allExercises.data.filter(
      (exercise) =>
        intersection([...exercise.secondary, ...exercise.primary], btnsSelected)
          .length > 0
    );
    //sets the display with filtered exercise list
    setDisplay({ data: filterResults });
  };

  const handleReset = (e) => {
    e.preventDefault();
    let btns = Array.prototype.slice.call(document.querySelectorAll("input"));
    btns.forEach(btn=> btn.checked=false)
    setDisplay(allExercises);
  }

  const handleFilter = (e) => {
    e.preventDefault();

    //takes all the inputs from DOM
    let btns = Array.prototype.slice.call(document.querySelectorAll("input"));

    //filters the inputs leaving only checked checkboxes
    btns = btns
    .filter((btn) => btn.type === "checkbox" && btn.checked)
    .map((btn) => btn.nextElementSibling.textContent);

    //runs the filter function on the checked buttons
    filterExercises(btns);
  };

  return (
    <div className="filter-bar">

      <div className="filter-bar__options">
      {allMuscles.data.map((muscle) => (
        <RadioButton key={muscle._id} muscle={muscle} />
      ))}
      </div>

      <div className="filter-bar__buttons">
      <button onClick={handleFilter}>
        <span>Filter</span>{" "}
      </button>

      <button onClick={handleReset}>
        <span>Reset</span>{" "}
      </button>
      </div>

    </div>
  );
};
