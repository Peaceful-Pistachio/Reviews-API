const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const reviews = 'reviews';
const photos = 'reviews_photos';
const lastID = 'reviews_lastID';

const addReviews_lastID = (callback) => {
  MongoClient.connect(url, (err, client) => {
    if(err) callback(err, null)
    const db = client.db(reviews);
    db.collection(reviews).findOne({}, {sort:{id: -1}}).then((review) =>
      db.collection(photos).findOne({}, {sort:{id: -1}}).then(photo => {
        db.collection(lastID).findOneAndUpdate({review_id: review.id, photo_id: photo.id}).then(result => console.log(result) )
      })
    )
  })
};
module.exports.addReviews_lastID = addReviews_lastID;

