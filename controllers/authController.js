const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "password is not incorrect";
  }

  if (err.code === 11000) {
    errors.email = "This email is already registered";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

//takes an id and returns an encoded jwt token with defined expiration time
const createToken = (id) => {
  return jwt.sign({ id }, "nebepasikiskiakopusteliaudamasis", {
    expiresIn: maxAge,
  });
};


//server response to the post request of the /signup
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  console.log("signup post request received");

  try {
    //creates database entry of the User model with receiver email and password
    const user = await User.create({ email, password });
    //creates a token depending on the user id, received from the database
    const token = createToken(user._id);
    //adds a cookie to the response
    res.cookie("workoutApp", token, { maxAge: maxAge * 1000 });
    //sends the response
    res.status(201).json({ user: user._id });
    console.log("user signed up: ", user.email);
  } catch (err) {
    //sends back the error, in case there was a wrong input
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};


//server response to the post request of the /login
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  console.log("login post request received");

  try {
    //runs the static login function of the login schema, 
    //defined in the user.model file
    const user = await User.login(email, password);
    //creates token
    const token = createToken(user._id);
    //adds cookie to the response
    res.cookie("workoutApp", token, {
      maxAge: maxAge * 1000,
    });
    //sends the response
    res.status(201).json({ user: user._id });
    console.log("user logged in: ", user.email);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

//server response to the get request of the /logout
module.exports.logout_get = async (req, res) => {
  //sends the cookie wih the minimal duration
  res.cookie("workoutApp", "", { maxAge: 1 });
  //reloads the page so the cookie expires
  res.redirect("/");
};
