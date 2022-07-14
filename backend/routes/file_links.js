require("dotenv").config();
const AWS = require("aws-sdk");
const express = require("express");

const bucket_name = "freeride-ridereports-dev";
const bucketParams = { Bucket: bucket_name };
AWS.config.update({
  accessKeyId: process.env.KeyId,
  accessSecretKey: process.env.SecretKey,
  region: process.env.region,
});
const s3 = new AWS.S3();

const router = express.Router();

router.get("/", (req, res) => {
  try {
    s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        var objects = data.Contents;
        var links = [];
        var temp;

        for (let i = 0; i < objects.length; i++) {
            var temp = objects[i].Key.split('/');
            const url = s3.getSignedUrl("getObject", {
              Bucket: "freeride-ridereports-dev",
              Key: objects[i].Key,
              Expires: 3600,
            });
            links[links.length] = {};
            links[links.length-1]["id"] = links.length;
            links[links.length-1]["date"] = [temp[0], temp[1]];
            links[links.length-1]["url"] = url; 
        }
        
        res.status(200).json({ links: links });
      }
    });
  } catch {
    res.status(400).json({ error: "error.massage" });
  }
});

router.post('/', (req, res) => {
  const {date} = req.body;
  console.log(req.body);
  res.status(200).json(req.body);
})

module.exports = router;
