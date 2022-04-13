import React, { useState, useContext } from "react";
import { getCookie } from "../helpers";
import { verify } from "jsonwebtoken";
import vars from '../vars'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}


//provides the state of the current user and its setter,
//which is used in login, logout and signup functions
//also provides the error state if there is any coming out of the auth functions
export function AuthProvider({ children }) {
  const [signError, setSignError] = useState("");

  const [guest, setGuest] = useState(false);

  //on re-render, checks if there is an authentication cookie in the browser
  const [currentUser, setCurrentUser] = useState(() => {
    const token = getCookie("workoutApp");
    if (token) {
      return verify(
        token,
        "nebepasikiskiakopusteliaudamasis",
        (err, decodedToken) => {
          if (!err) {
            return {user:decodedToken.id};
          }
        }
      );
    }
    return null;
  });

  //signup frontend function used on click at the sign up form
  async function signup(email, password) {
    try {
      //sends a post request to the server on the /signup route
      const res = await fetch(`${vars.host}signup/`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      //if data received, sets the current user according to the received data
      if (data.user) {
        console.log("sign up success.  user id: ", data.user);
        setCurrentUser({user:data.user});
      }

      //if not, sets the error
      if (data.errors) {
        setSignError(data.errors.email || data.errors.password);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //login frontend function used on click at the login form
  async function login(email, password) {
    try {
      //sends a post request to the server on the /login route
      const res = await fetch(`${vars.host}login/`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();

      //if data received, sets the current user according to the received data
      if (data.user) {
        console.log("login success. user id: ", data.user);
        setCurrentUser({user:data.user});
      }

      //if not, sets the error
      if (data.errors) {
        setSignError(data.errors.email || data.errors.password);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //logout frontend function used on click at the logout button
  async function logout() {
    try {
      //sends a get request to the server on the /logout route
      await fetch(`${vars.host}logout/`, {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {
      console.log(err);
    }
  }

  //exports the states and functions to the wrapped components(children)
  const value = {
    currentUser,
    setCurrentUser,
    login,
    signup,
    logout,
    signError,
    setSignError,
    guest,
    setGuest
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
