const PapaParser = require('papaparse');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const charReviews = 'characteristic_reviews';
const reviewsMeta = 'reviews_meta';
const reviewsFile = fs.createReadStream('rawData/reviews.csv');
const characteristicsFile = fs.createReadStream('rawData/characteristics.csv');

/*-------------addNameToCharReview - worked ✅ ----------------*/
const addNameToCharReview = (callback)=> {
  MongoClient.connect(url, function(err, client) {
    if (err) callback(err)
      const db = client.db("reviews");
      PapaParser.parse(characteristicsFile, {
        encoding: 'utf-8',
        delimiter: ',',
        header: true,
        step: (results, parser) => {
          const {id, name, product_id} = results.data
          parser.pause();
          db.collection(charReviews).updateMany({'characteristic_id': Number(id)}, {$set:{'characteristic': name, 'product_id': product_id}})
            .then(() => parser.resume())
        },
        complete: (results) => {
          callback(' Add characteristic to char_reviews successfully !')
        }
      });
  });
};

/*------------Group Review by product_id and calulate average over all reviews for Meta ✅ ----------*/
const groupReviewByProductId = (callback) => {
  MongoClient.connect(url, function(err, client) {
    if (err) callback(err, null)
      const db = client.db("reviews");
      PapaParser.parse(reviewsFile, {
        encoding: 'utf-8',
        delimiter: ',',
        header: true,

        step: (results, parser) => {
          parser.pause();
          reviewsFile.pause();
          const {id, product_id, rating, recommend} = results.data

          db.collection(charReviews).find({'review_id': Number(id)}).toArray()
            .then((reviewData) => {
              const charInfo = {};
              reviewData.forEach(el => {
                charInfo[el.characteristic] = {'id': el.characteristic_id, 'value': el.value}
              })
              db.collection(reviewsMeta).findOne({'product_id': Number(product_id)}).then(product => {
                if(product === null) {
                  db.collection(reviewsMeta).insertOne({
                    'product_id': Number(product_id),
                    'rating': {
                      [rating]: 1
                    },
                    'recommended': {
                      [recommend]: 1
                    },
                    'characteristics':charInfo,
                    'totalReviews': 1
                  }).then(()=>{
                    reviewsFile.resume();
                    parser.resume();
                  })
                } else {
                  db.collection(reviewsMeta).findOne({'product_id': Number(product_id)}).then(previousData => {
                    const data = {...charInfo, 'rating': Number(results.data['rating']), 'recommend':recommend};
                    const {rating, totalReviews, product_id} = previousData;
                    const getAvg = (value, previousVal) => (parseFloat(((totalReviews * previousVal) + value )/ (totalReviews + 1)).toFixed(2));
                    previousData.rating[data.rating] =  previousData.rating[data.rating] ?  previousData.rating[data.rating]+1 : 1;
                    previousData.recommended[data.recommend] =  previousData.recommended[data.recommend] ? previousData.recommended[data.recommend]+1 : 1;
                    for ( key in data) {
                      if(!['rating', 'recommend'].includes(key)) {
                        previousData.characteristics[key]['value'] = getAvg(data[key]['value'], previousData.characteristics[key]['value'])
                      }
                    }
                    previousData.totalReviews++;
                    db.collection(reviewsMeta).findOneAndUpdate({'product_id': Number(product_id)}, {$set:{
                      'rating': previousData.rating,
                      'characteristics': previousData.characteristics,
                      'recommended': previousData.recommended,
                      'totalReviews': previousData.totalReviews
                    }}).then(result => {
                      reviewsFile.resume();
                      parser.resume();
                    });
                  })
                }
              });
            });
        },
        complete: (results) => {
          callback(null, 'Update Meta successfully !')
        }
      });
  });
}


module.exports.groupReviewByProductId = groupReviewByProductId;
module.exports.addNameToCharReview = addNameToCharReview;