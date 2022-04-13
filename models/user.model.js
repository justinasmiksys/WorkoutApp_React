const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//user model for the database
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must contain at least 6 characters"],
  },
  workouts: {
    type: Array,
  },

  workoutId:{
    type:Number,
    default:0
  },

  events: {
    type: Array,
  },

  eventId:{
    type:Number,
    default:0
  },
});

//encrypts the password before saving it in the database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


//this function is used for the server response to the post request of the /login
userSchema.statics.login = async function (email, password) {

  //finds the user entry in the database that matches the input email
  const user = await this.findOne({ email });

  if (user) {
    //encrypts the password and compares with the one in the database
    const auth = await bcrypt.compare(password, user.password);

    if (auth) return user;

    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
