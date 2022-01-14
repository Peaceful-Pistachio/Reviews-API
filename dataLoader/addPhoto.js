const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const reviewsDB = 'reviews'; //collections
const reviewPhotosDB = 'reviews_photo';

//  const addPhoto = (reviewId, photoId, url ) => {

  // Loading process: set photo:[] for each reviews

    const initializePhoto = (callback) => {
      MongoClient.connect(url, function(err, db) {
        if (err) throw(err)
        const dbo = db.db("reviews"); //database
        dbo.collection(reviewsDB).updateMany({}, {$set: {photos:[]}}).then(data => callback(data))
      });
    }

    const addReviewPhoto = (review_id, id, url) => {
      // MongoClient.connect(url, function(err, db) {
      //   if (err) throw(err)
        const dbo = db.db("reviews"); //database
        dbo.collection(reviewsDB).findOneAndUpdate({id:review_id}, {$push: {photos:{id:id, url:url}}}).then(data => {
          console.log(data);
          // db.close();
        })
      // });
    }



  // add photo in





// }
module.exports.addReviewPhoto = addReviewPhoto;