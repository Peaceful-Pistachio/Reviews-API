
const PapaParser = require('papaparse');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const reviewsDB = 'reviews'; //collections
const reviewsPhotoFile = fs.createReadStream('rawData/reviews_photos.csv');
const allCharsFile = fs.createReadStream('rawData/characteristics.csv');
const { Char, Meta } = require('../model/reviewsModel');



/*-------------SET PHOTOS FIELD to EMPTY - worked ✅-----------------*/
const resetPhotoFieldReviews = (callback) => {
  MongoClient.connect(url, function(err, client) {
    if (err) callback(err)
    const db = client.db("reviews");
        db.collection(reviewsDB).updateMany(
          {},
          {
            $set:{'photos': []},
          }).then(data => callback(data))
  });
};

/**--------------- ADD URL TO PHOTOS FIELD----worked✅----- */
const addPhotoReviews = (callback) => {
  MongoClient.connect(url, function(err, client) {
    if (err) callback(err)
    const db = client.db("reviews");
    PapaParser.parse(reviewsPhotoFile, {
      encoding: 'utf-8',
      delimiter: ',',
      header: true,

      step: (results, parser) => {
        parser.pause();
        const {review_id, id, url} = results.data;
        db.collection(reviewsDB).updateOne(
          {id:Number(review_id)},
          {
            $addToSet: {'photos':{id:Number(id), url:url}}
          }).then(()=>  parser.resume());
      },
      complete: (results) => {
        callback(' Loaded photos url to photos field reviews successfully !')
      }
    });
  });
};


const addTheRestProductToMeta = (callback) => {
  MongoClient.connect(url, function(err, client) {
    if (err) callback(err, null)
    const db = client.db("reviews");
    PapaParser.parse(allCharsFile, {
      encoding: 'utf-8',
      delimiter: ',',
      header: true,

      step: (results, parser) => {
        parser.pause();
        allCharsFile.pause();
        const {product_id, id, reviewer_name} = results.data;
        db.collection('reviews_meta').findOne({product_id:Number(product_id)}).then(result => {
          if(result === null) {
            Char.find({product_id: Number(product_id)}).exec((err, productChar) => {
              const temp = {};
              productChar.forEach(el => {
                  const {name, id} = el;
                  temp[name] = {id, value:0}
              });
              new Meta({product_id: Number(product_id), characteristics: temp, rating:{}, recommended:{}}).save().then(result => {
                console.log(result)
                allCharsFile.resume();
                parser.resume();
              })
            });
          } else {
            allCharsFile.resume();
            parser.resume();
          }
        });
      },
      complete: (results) => {
        callback(null,' Done !')
      }
    });
  });
};

module.exports.resetPhotoFieldReviews = resetPhotoFieldReviews;
module.exports.addPhotoReviews = addPhotoReviews;