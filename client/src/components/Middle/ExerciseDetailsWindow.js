import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { useMiddle } from "../../contexts/MiddleDisplayContext";
import { useExDetails } from "../../contexts/ExerciseDetailsContext"

const MuscleImg = ({ url }) => {
  return <img className="popup__img--mcl" src={url} alt="" />;
};

const DescriptionList = ({ list }) => {
  return (
    <ul className="popup__description__list">
      {list.map((li, i) => (
        <li key={i}>{li}</li>
      ))}
    </ul>
  );
};



const SelectWorkoutWindow = ({workouts}) => {

  const { setAddToWorkoutState, setEditWorkoutState } = useUser();
  const { setSelectedWorkout } = useMiddle();


  const handleAddEvent = (workout) => {
    setSelectedWorkout(workout);
    setEditWorkoutState(true);
    setAddToWorkoutState(false);
  }  

  const handleClose = () => {
    setAddToWorkoutState(false);
  }

  return <div className="add-event-window-container">

        <h2 className="add-event__title">Please select the workout</h2>

  <button className="exercise-field__btn-esc add-event__btn-close" onClick={handleClose}><svg
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





//returns an exercise details component
export const ExerciseDetailsWindow = ({
  description,
  equipment,
  img_url,
  primary,
  secondary,
  title,
  primary_img,
  secondary_img,
}) => {

  const { currentUser, setGuest } = useAuth();
  const { userData, addToWorkoutState, setAddToWorkoutState } = useUser();
  const { setClickedExercise } = useExDetails();

  const handleClose = () => {
    setClickedExercise();
    setAddToWorkoutState(false);
  };

  const handleFooter = (e) => {
    setClickedExercise();
    setGuest(e.target.textContent);
  }

  const handleAdd = () => {
    setAddToWorkoutState(true);
  }

  return (
    <div className="popup-box">
      <div className="popup">
        <div className="popup__header">
          <button className="popup__header__btn" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="popup__header__btn--icon"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </button>
          <h2 className="popup__header__title">{title}</h2>
        </div>

        <div className="popup__content">
          <div className="popup__content__left">
            <div className="popup__img__muscle-container">
              {primary_img.map((primary_url, i) => (
                <MuscleImg key={i} url={primary_url} />
              ))}
              {secondary_img.map((secondary_url, i) => (
                <MuscleImg key={i} url={secondary_url} />
              ))}
              <img
                className="popup__img--base"
                src="https://cdn-xi3mbccdkztvoept8hl.netdna-ssl.com/train/wp-content/themes/workoutlabs2.0/img/muscle-groups/master.png"
                alt=""
              />
            </div>

            <div className="popup__info__table">
              <h3 className="popup__info__table__heading">
                Primary:{" "}
                <p className="popup__info__table__info">
                  {" "}
                  {primary.join(", ")}{" "}
                </p>
              </h3>
              <h3 className="popup__info__table__heading">
                Secondary:{" "}
                <p className="popup__info__table__info">
                  {secondary.join(", ")}
                </p>
              </h3>
              <h3 className="popup__info__table__heading">
                Equipment:{" "}
                <p className="popup__info__table__info">{equipment}</p>
              </h3>
            </div>

            {currentUser && <button onClick={handleAdd} className="popup__btn--add">Add to workout</button>}

          </div>

          <div className="popup__content__right">
            {description.length === 0 ? (
              <img className="popup__img--main" src={img_url} alt="" />
            ) : (
              <DescriptionList list={description} />
            )}
          </div>


        </div>

        {!currentUser && 
          <div className="popup__footer">
            In order to add this exercise to your workout, please <span onClick={handleFooter}>login</span>. 
            If you do not have an account, <span onClick={handleFooter}>signup</span>.
          </div>}


        {addToWorkoutState ? <SelectWorkoutWindow workouts={userData.workouts} /> : <div></div>}

      </div>
    </div>
  );
};
