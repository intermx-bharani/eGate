const fs = require('fs');
const AWS = require('aws-sdk');



const uploadFile =  (image) => {
    let s3 = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        region: process.env.S3_REGION,
      });
  
      const bucketName = process.env.S3_BUCKET_NAME;
     let bucketPath ='buddies-2022-projects/egate/'

      let params = {
        Bucket: bucketName,
        Key: bucketPath,
        Body: image,
      };
      s3.putObject(params, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('hello')
        }
      });
    };
    uploadFile('home/downloads/dog.jpg')
  
module.exports = {uploadFile}

