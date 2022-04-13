import React, { useState, useContext } from "react";

const MiddleDisplayContext = React.createContext();

export function useMiddle() {
  return useContext(MiddleDisplayContext);
}


//provides a state of a middle workout display
//the state becomes non-null when the user clicks on one of his workouts,
//which is then displayed at the middle part of the app
export function MiddleDisplayProvider({ children }) {
  const [selectedWorkout, setSelectedWorkout] = useState();

  const value = { selectedWorkout, setSelectedWorkout };

  return (
    <MiddleDisplayContext.Provider value={value}>
      {children}
    </MiddleDisplayContext.Provider>
  );
}
