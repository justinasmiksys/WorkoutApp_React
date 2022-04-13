const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require('path')

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//cors allows the app to connect from the different port
app.use(cors({ origin: true, credentials: true }));

//recognizes the incoming request object as JSON object
app.use(express.json());

app.use(cookieParser());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});


//establishes the connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//imports the routes
const musclesRouter = require("./routes/muscles");
const exercisesRouter = require("./routes/exercises");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

//directs the request to the according route
app.use("/muscles", musclesRouter);
app.use("/exercises", exercisesRouter);
app.use(authRoutes);
app.use(userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
