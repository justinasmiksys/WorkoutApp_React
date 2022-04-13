import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signError, setSignError, setGuest, guest } = useAuth();
  const history = useHistory();

  
  useEffect(() => {
    if(guest) {
      history.push("/" + guest)
    }
  }, [guest]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setSignError("");
      login(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      setSignError("Failed to log in");
      console.log(err);
    }
  };

  return (
    <div className="log-sign">
      <form className="log-sign__form" onSubmit={handleSubmit}>
        <h2 className="log-sign__title">Log in</h2>
        <input
          className="log-sign__input"
          type="text"
          placeholder="Email"
          ref={emailRef}
          required
        />

        <input
          className="log-sign__input"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />

        <div className="log-sign__error">{signError}</div>
        <button className="link log-sign__btn">Log In</button>
      </form>
      <div className="text-extra">
        Don't have an account? <Link onClick={() => setGuest("signup")} to="/signup">Sign up</Link>
      </div>
      <Link onClick={() => setGuest(false)} to="/">
        <svg
          className="home-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>
    </div>
  );
};
