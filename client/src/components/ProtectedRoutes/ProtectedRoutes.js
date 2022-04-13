import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedRoute({ component: Component, ...restOfProps }) {

  //takes the auth context from the provider
  const { currentUser } = useAuth();

  //returns the component if the currentUser is non-null, otherwise
  //redirects to the signup route
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/signup" />
      }
    />
  );
}

export function GuestRoute({ component: Component, ...restOfProps }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !currentUser ? <Component {...props} /> : <Redirect to="/profile" />
      }
    />
  );
}
