require('dotenv').config()
const AWS = require("aws-sdk");
const express = require('express')

const bucket_name = "freeride-ridereports-dev";
const bucketParams = {Bucket: bucket_name,};
AWS.config.update({ 
    accessKeyId: process.env.KeyId,
    accessSecretKey: process.env.SecretKey,
    region: process.env.region,
});
const s3 = new AWS.S3();

const router = express.Router()

router.get('/', (req, res) => {
    try{
        s3.listObjects(bucketParams, function (err, data) {
            var links = [];
            if (err) {
              console.log("Error", err);
            } else {
            var objects = data.Contents;
            for (let i = 0; i < objects.length; i++){
              const url = s3.getSignedUrl("getObject", {
                Bucket: "freeride-ridereports-dev",
                Key: objects[i].Key,
                Expires: 3600,
              });
              links[i] = {}
              links[i]["id"]= i;
              links[i]["date"]= objects[i].Key;
              links[i]["url"]= url;
        }
        res.status(200).json({links: links})
        }});
    } catch{
        res.status(400).json({error: "error.massage"})
    }
})

module.exports = router