// const fs = require('fs');
const AWS = require('aws-sdk');



const uploadFile = async (req,res) => {
    let s3 = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        region: process.env.S3_REGION,
      });

    //   const imageURL = 'https://www.pexels.com/search/dogs/'
    //   console.log(imageURL)
    //   const res = await fetch(imageURL)
    //   const blob = await res.buffer()

    //   const imagePath = req.files[0].imagePath
    //   const blobs = fs.readFileSync(imagePath)

    //   const uploadedImage = await s3.upload({
    //     Bucket: process.env.S3_BUCKET_NAME,
    //     Key: req.files[0].originalFilename,
    //     Body: blobs,
        
    //   }).promise()
    //   console.log(uploadFile);

    //   uploadedImage.Location
    // }
  
     const bucketName = process.env.S3_BUCKET_NAME;
    //  let bucketPath ='buddies-2022-projects/egate/'

      // let params = {
      //   Bucket: bucketName,
      //   Key: bucketPath,
      //   Body: image,
      // };
      s3.putObject({
        Bucket: bucketName,
        Key: "dog.jpg",
        Body: "image",
      })
      .promise();
    };
    // uploadFile('home/downloads/dog.jpg')
   
module.exports = {uploadFile}

