const parse = require('csv-parser');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const reviewsDB = 'reviews'; //collections
const reviewPhotosDB = 'reviews_photo';

const addPhotoToReviews = (callback) => {
  MongoClient.connect(url, function(err, db) {
    if (err) callback(err)
      fs.createReadStream('rawData/reviews_photos.csv')
        .pipe(
          parse({
            delimiter: ','
          })
        )
        .on('data', function(dataRow) {
          const {review_id, id, url} = dataRow;
          const dbo = db.db("reviews");
            dbo.collection(reviewsDB).updateOne(
              {id:Number(review_id)},
              {$addToSet: {"photos":{id:Number(id), url:url}}})
              .then(data => {
              console.log(id);
            })
        })
        .on('end', function() {
          callback(null,'Loaded data successfully!')
          db.close();
        })
        .on('error', function(error) {
          callback(error)
        })
  });
}

// to empty photo array of all reviews
const emptyPhotoReviews = (callback) => {
  MongoClient.connect(url, function(err, db) {
    if (err) callback(err)
      const dbo = db.db("reviews"); //database
      dbo.collection(reviewsDB).updateMany({}, {$set: {photos:[]}})
        .then(data => {
          callback(null, data);
          // console.log(data)
        })
  });
}

module.exports.emptyPhotoReviews = emptyPhotoReviews;
module.exports.addPhotoToReviews = addPhotoToReviews;




//     },

//     getRawReviewsPhotos: (callback)=> {
//       let rawData = [];
//       fs.createReadStream(__dirname + '/reviews_photos.csv')
//         .pipe(
//           parse({
//             delimiter: ','
//           })
//         )
//         .on('data', function(dataRow) {
//           rawData.push(dataRow);
//         })
//         .on('end', function() {
//           callback(null, rawData)
//         })
//         .on('error', function(error) {
//           callback(error)
//         })
//       },

//     getRawCharacteristics: (callback)=> {
//       let rawData = [];
//       fs.createReadStream(__dirname + '/characteristics.csv')
//         .pipe(
//           parse({
//             delimiter: ','
//           })
//         )
//         .on('data', function(dataRow) {
//           rawData.push(dataRow);
//         })
//         .on('end', function() {
//           callback(null, rawData)
//         })
//         .on('error', function(error) {
//           callback(error)
//         })
//       },
//     getRawCharReviews: (callback)=> {
//       let rawData = [];
//       fs.createReadStream(__dirname + '/characteristic_reviews.csv')
//         .pipe(
//           parse({
//             delimiter: ','
//           })
//         )
//         .on('data', function(dataRow) {
//           rawData.push(dataRow);
//         })
//         .on('end', function() {
//           callback(null, rawData)
//         })
//         .on('error', function(error) {
//           callback(error)
//         })
//       },

// }