import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export function Home() {

  //takes the state of the current user from the context provider
  const { currentUser, guest } = useAuth();
  const history = useHistory();


  useEffect(() => {
    if(guest) {
      history.push("/" + guest)
    }
  }, [guest]);

  //if current user is non-null, returns profile component
  //otherwise returns a home, login/signup page 
  return (
    <>

      {currentUser ? (
        history.push("/profile")
      ) : (
        <div className="home-container">
          <h2 className="home-header">Workout Planner</h2>
          <div className="container-btn-home">
            <Link className="link login" to="/login">
              Log In
            </Link>

            <Link className="link signup" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
