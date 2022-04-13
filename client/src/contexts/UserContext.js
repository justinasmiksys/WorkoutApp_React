import React, { useState, useContext } from "react";
import axios from "axios";
import vars from '../vars'

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

//provides tha data of the user by its id
//provides getData method and addWorkout method to the frontend
export function UserProvider({ children }) {
  const [userData, setUserData] = useState();

  const [editWorkoutState, setEditWorkoutState] = useState(false);
  const [calendarState, setCalendarState] = useState(false);
  const [addEventState, setAddEventState] = useState(false);
  const [addToWorkoutState, setAddToWorkoutState] = useState(false);


  async function getUserData(id) {
    //sends the get request to the server on the /profile/:id route,
    //where id is the user id
    await axios
      .get(`${vars.host}profile/${id}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => console.log(err));
  }

  async function addWorkout(workout, user) {
    try {
      //sends the post request to the server on the /addworkout route
      //request includes the workout object and the user,
      //to which workout list this workout should be added
      const res = await fetch(`${vars.host}addworkout/`, {
        method: "POST",
        body: JSON.stringify({ workout, user }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();

      if (data) return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function editWorkout(newWorkout, oldWorkout, user) {
    try {
      //sends the post request to the server on the /editworkout route
      //request includes the old and new workout objects and the user object
      const res = await fetch(`${vars.host}editworkout/`, {
        method: "POST",
        body: JSON.stringify({ newWorkout, oldWorkout, user }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();

      if (data) return data;
    } catch (err) {
      console.log(err);
    }
  }


  async function deleteWorkout(workout, user){

    try{

      const res = await fetch(`${vars.host}deleteworkout/`, {
        method: "POST",
        body: JSON.stringify({ workout, user }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

    } catch(err){
      console.log(err)
    }
  }

  async function addEvent(event, user){

    try{

      const res = await fetch(`${vars.host}addevent/`, {
        method: "POST",
        body: JSON.stringify({ event, user }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

    } catch(err){
      console.log(err)
    }
  }

  async function removeEvent(eventId, userId){

    try{

      const res = await fetch(`${vars.host}removeevent/`, {
        method: "POST",
        body: JSON.stringify({ eventId, userId }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

    } catch(err){
      console.log(err)
    }
  }




  const value = {
    userData,
    getUserData,
    addWorkout,
    editWorkout,
    deleteWorkout,
    editWorkoutState,
    setEditWorkoutState,
    calendarState,
    setCalendarState,
    addEvent,
    removeEvent,
    addEventState,
    setAddEventState,
    addToWorkoutState,
    setAddToWorkoutState
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
