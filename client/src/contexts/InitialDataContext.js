import React, { useState, useEffect, useContext } from "react";
import { fetchData } from "../helpers";

const InitialDataContext = React.createContext();

export function useInitialData() {
  return useContext(InitialDataContext);
}

//provides initial data of all exercises and all muscles
export function InitialDataProvider({ children }) {
  const [allExercises, setAllExercises] = useState({ data: [] });
  const [allMuscles, setAllMuscles] = useState({ data: [] });

  useEffect(() => {
    fetchData("exercises", setAllExercises);
    fetchData("muscles", setAllMuscles);
  }, []);

  const value = {
    allExercises,
    allMuscles
  }

  return (
    <InitialDataContext.Provider value={value}>
        {children}
    </InitialDataContext.Provider>
  )
}
