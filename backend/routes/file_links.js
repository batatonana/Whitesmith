require("dotenv").config();
const AWS = require("aws-sdk");
const express = require("express");
const UserModel = require("../config/database/UserModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocationModel = require("../config/database/LocationModel");
require("../config/passport");
const FixedstopModel = require("../config/database/FixedStopModel");

const bucket_name = "freeride-ridereports-dev";
const bucketParams = { Bucket: bucket_name };
AWS.config.update({
  accessKeyId: process.env.KeyId,
  accessSecretKey: process.env.SecretKey,
  region: process.env.region,
});
const s3 = new AWS.S3();

const router = express.Router();

// post request to chose a date
router.post(
  "/links",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    bucketParams.Prefix = req.body.year + "/" + req.body.month + "/";
    try {
      s3.listObjects(bucketParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          var objects = data.Contents;
          var links = [];
          for (let i = 0; i < objects.length; i++) {
            var temp = objects[i].Key.split("/");
            var file = temp[2].split(".")[temp[2].split(".").length - 1];
            const url = s3.getSignedUrl("getObject", {
              Bucket: "freeride-ridereports-dev",
              Key: objects[i].Key,
              Expires: 3600,
            });

            // if the file is a zip
            if (file == "zip") {
              var zip = url;
            }

            // if the file is not a zip
            else if (file == "csv") {
              links[links.length] = {};
              links[links.length - 1]["id"] = links.length;
              links[links.length - 1]["date"] = [temp[0], temp[1]];
              links[links.length - 1]["url"] = url;
              links[links.length - 1]["name"] = objects[i].Key.split("/")[2];
            }
          }

          res.status(200).json({ links: links, zip: zip });
        }
      });
    } catch {
      res.status(400).json({ error: "error.message" });
    }
  }
);

// post request to login
router.post("/login", (req, res) => {
  UserModel.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(401).send({
        sucess: false,
        message: "User not found!",
      });
    }
    if (req.body.password != user.password) {
      return res.status(401).send({
        sucess: false,
        message: "Wrong password",
      });
    }

    const payload = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.PASSWORD, { expiresIn: "1h" });

    return res.status(200).send({
      sucess: true,
      message: "Loged in!",
      token: "Bearer " + token,
    });
  });
});

// get all the locations
router.get(
  "/locations",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    LocationModel.find({}).then((location) => {
      res.status(200).json(location);
    });
  }
);

// post date to fetch fixedstops
router.post(
  "/locations",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    FixedstopModel.find({ location: req.body.locId }).then((stops) => {
      res.status(200).json(stops);
    });
  }
);

// post csv information
router.post(
  "/fixedstops",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    FixedstopModel.deleteMany({ location: req.body.location }, function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    });
    for (let i = 0; i < req.body.parsedData.length - 1; i++) {
      var data = new FixedstopModel({
        name: req.body.parsedData[i].name,
        bname: req.body.parsedData[i].bussinessName,
        latitude: req.body.parsedData[i].latitude,
        longitude: req.body.parsedData[i].longitude,
        status: req.body.parsedData[i].status,
        location: req.body.location,
      });
      data.save(function (err, data) {
        if (err) return console.error(err);
      });
    }
    res.status(200).json({msg: "hey"});
  }
);

module.exports = router;
