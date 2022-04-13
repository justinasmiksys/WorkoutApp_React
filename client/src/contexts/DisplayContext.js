import React, { useState, useEffect, useContext } from "react";
import { fetchData } from "../helpers";

const DisplayContext = React.createContext();

export function useDisplay() {
  return useContext(DisplayContext);
}

//provides the exercises display state and its setter
export function DisplayDataProvider({ children }) {
  const [display, setDisplay] = useState({ data: [] });

  useEffect(() => {
    fetchData("exercises", setDisplay);
  }, []);

  const value = {
    display, 
    setDisplay
  };

  return (
    <DisplayContext.Provider value={value}>
        {children}
    </DisplayContext.Provider>
  );
}
