import React, { useEffect} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { useMiddle } from "../../contexts/MiddleDisplayContext";
import { useHistory } from "react-router-dom";
import { WorkoutList } from "./WorkoutList";

export function UserProfile() {
  //takes the current user state and its setter from the context provider
  //also takes the logout function from same provider
  //current user is checked at browser cookies
  const { setCurrentUser, currentUser, logout } = useAuth();

  const { setSelectedWorkout } = useMiddle();

  //takes the user data state and getuserdata function
  const { userData, getUserData, calendarState, setCalendarState, setAddEventState } = useUser();
  const history = useHistory();

  //if current user in the browser exists, its data is requested at server
  //if server approves, getUserData gets server response and sets the user data
  useEffect(() => {
    getUserData(currentUser.user);
    console.log("user data received")
  }, [currentUser]);


  //logs out and resets current user to null
  const handleLogout = () => {
    try {
      logout();
      setCurrentUser();
      history.push("/");
      // window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCalendar = (e) => {

    setSelectedWorkout();

    if (e.target.textContent==="My calendar"){
      setCalendarState(true)
    }

    if (e.target.textContent==="Exercise list"){
      setCalendarState(false)
    }

    if (e.target.classList.contains("profile__btn--active")) return
    setAddEventState(false);
  }

  return (
    <div className="profile">
      <div className="profile__nav">
        <div className="profile__email">{userData && userData.email}</div>
        <button className="btn-logout" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="btn-logout__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>

        <div className="profile__btn__container">
          <button className="profile__btn profile__btn profile__btn--active" onClick={handleCalendar}>Exercise list</button>
          <button className="profile__btn profile__btn" onClick={handleCalendar}>My calendar</button>
        </div>


      {/* renders a list of users workouts */}
      <div className="list">
        <h2 className="list__title">My Workouts:</h2>
        {userData && <WorkoutList userData={userData} />}
      </div>
      {/* renders a button that takes to a new workout page */}
      {/* which renders a WorkoutForm component, like its defined in the SideBarRight component */}
      <button className="btn-new" onClick={() => history.push("/newworkout")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="btn-new__icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
