require("dotenv").config();
const express = require("express");
const files = require("./routes/file_links");
const bp = require("body-parser");
const passport = require("passport");
const UserModel = require("./database");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require('connect-mongo');

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
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.PASSWORD,
    resave: false,
    saveUninitialized: true,
    store : MongoStore.create({
        mongoUrl : "mongodb://localhost:27017/circuitapp",
        collectionName : "sessions",
        ttl: 3600, 
    }),
    maxAge: 1000 * 3600,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
