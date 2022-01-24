const PapaParser = require('papaparse');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const reviewsDB = 'reviews';
const reviewMeta = 'reviews_meta';

/*-------------DELETE PHOTOS FIELD -----------------*/
const deletePhotoFieldReviews = (callback) => {
  MongoClient.connect(url, function(err, client) {
    if (err) callback(err)
      const db = client.db("reviews");
        db.collection(reviewsDB).updateMany(
          {},
          {
            $unset: {'photos':''},
          }).then(data => callback(data))
  });
};

/** -----------Clean up Meta data-------- */
const deleteProductMeta = (callback) => {
  MongoClient.connect(url, function(err, client) {
    if(err) callback(err, null)
    const db = client.db('reviews');
    db.collection(reviewMeta).remove({}).then( result => callback(null, 'Deleted succesfully'))
  })
}



module.exports.deletePhotoFieldReviews = deletePhotoFieldReviews;
module.exports.deleteProductMeta = deleteProductMeta;