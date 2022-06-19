const AWS = require("aws-sdk");
const fs = require("fs");



var s3 = new AWS.S3({
  accessKeyId: "AKIA3G5JJQSWD65I4HEL",
  secretAccessKey: "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",
  region: "ap-south-1",
});



const uploadFile = (filename) => {
  const fileContent = fs.readFileSync(filename);

  const params = {
    Bucket: "buddies-2022-projects/egate",
    Key: `dog.jpg`,
    Body: "fileContent",
    ContentType: "image/jpg",
  };

  s3.upload(params, (s3Err, data) => {
    if (s3Err) {
      throw s3Err;
    } else {
      console.log("file upload successfully", data.Location);
    }
  });
};



module.exports = { uploadFile };
