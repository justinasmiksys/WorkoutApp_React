import React, { useState, useContext } from "react";

const WorkoutFormContext = React.createContext();

export function useWorkoutForm() {
  return useContext(WorkoutFormContext);
}

//provides the exercises state and its setter to the sidebar-right component
//used in the workout form of the user to add/remove exercises
export function WorkoutFormProvider({ children }) {
  const [exercises, setExercises] = useState();

  const value = { exercises, setExercises };

  return (
    <WorkoutFormContext.Provider value={value}>
      {children}
    </WorkoutFormContext.Provider>
  );
}
