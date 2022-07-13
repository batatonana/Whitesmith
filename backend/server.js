require("dotenv").config();
const express = require("express");
const files = require("./routes/file_links");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// express app
const app = express();

app.use(cors(corsOptions));

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
