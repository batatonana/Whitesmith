require("dotenv").config();
const express = require("express");
const files = require("./routes/file_links");
const bp = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// express app
const app = express();
app.use(cors(corsOptions));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(passport.initialize())


// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use(files);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Runing on port 4000");
});
