import React, { useState, useContext } from "react";

const ExerciseDetailsContext = React.createContext();

export function useExDetails() {
  return useContext(ExerciseDetailsContext);
}


//provides information of the current selected exercise,
//which is displayed when the user/guest clicks on one of the exercises
//in the middle part of the app
export function ExDetailsProvider({ children }) {
  const [clickedExercise, setClickedExercise] = useState();

  const value = { clickedExercise, setClickedExercise };

  return (
    <ExerciseDetailsContext.Provider value={value}>
      {children}
    </ExerciseDetailsContext.Provider>
  );
}
