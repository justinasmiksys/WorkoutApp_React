import React from "react";
import { BrowserRouter as Router, Switch} from "react-router-dom";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";
import { Home } from "./Home";
import { UserProfile } from "./UserProfile";
import { WorkoutForm } from "../WorkoutForm/WorkoutForm";
import { ProtectedRoute, GuestRoute } from "../ProtectedRoutes/ProtectedRoutes";

import exit from '../../img/x.png'


export const SideBarRight = () => {

  const handleExit = () => {
    const sideRight = document.getElementsByClassName('sidebar-right')[0]
    sideRight.classList.remove('visible')
  }

  return (
    <div className="sidebar-right">
      <span onClick={handleExit} className="sidebar-right__exit">
        <img src={exit}></img>
      </span>
      <Router>
        <Switch>
          <GuestRoute path="/signup" component={SignUp} />
          <GuestRoute path="/login" component={LogIn} />
          <ProtectedRoute path="/profile" component={UserProfile} />
          <ProtectedRoute path="/newworkout" component={WorkoutForm} />
          <GuestRoute path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};
