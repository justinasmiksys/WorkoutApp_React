import React, { useEffect } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";

const AddEventWindow = ({ workouts }) => {

  const { userData, addEvent, addEventState, setAddEventState } = useUser();
  const { currentUser, setCurrentUser } = useAuth();

  const handleClose = () => {
    setAddEventState(false);
  }


  const handleAddEvent = async (workout) => {

    const event = {
      title: workout.title,
      date: addEventState,
      backgroundColor: workout.color,
      id: workout.id,
      eventId: userData.eventId
    }

    await addEvent(event, currentUser.user)
    await setCurrentUser({ user: currentUser.user });
    await setAddEventState(false);
  }

  return <div className="add-event-window-container">


    <h1 className="add-event__title">Date: {addEventState}</h1>

    <button className="exercise-field__btn-esc add-event__btn-close" onClick={handleClose}>
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



    <ul className="list__list add-event__list">
      {workouts.map((workout) => (
        <li className="list__workout add-event__workout">
          <button style={{ backgroundColor: workout.color }} onClick={() => handleAddEvent(workout)}>
            {workout.title}
          </button>
        </li>
      ))}
    </ul>

  </div>
}

export const Calendar = () => {

  const { userData, addEventState, setAddEventState, removeEvent } = useUser();
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
   const btn = document.querySelectorAll(".profile__btn")[1]

   if(btn){
     btn.classList.add("profile__btn--active")
   }

   return function cleanup() {
    const btn = document.querySelectorAll(".profile__btn")[1]

    if(btn){
      btn.classList.remove("profile__btn--active")
    }
   }
  }, []);

  const handleDateClick = (arg) => {
    setAddEventState(arg.dateStr)
  }

  const handleEventClick = async (e) => {
    await removeEvent(e.event._def.extendedProps.eventId, currentUser.user);
    await setCurrentUser({ user: currentUser.user });
  }

  return <div className='calendar-container'>

    {addEventState ? <AddEventWindow workouts={userData.workouts} /> : <div></div>}


    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={handleDateClick}
      initialView="dayGridMonth"
      events={userData.events}
      eventClick={handleEventClick}
    />

  </div>
}
