const PapaParser = require('papaparse');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const reviewsDB = 'reviews'; //collections
const reviewPhotosDB = 'reviews_photo'
const charReviews = 'characteristic_reviews';
const reviewsPhotoFile = fs.createReadStream('rawData/reviews_photos.csv');
const characteristicsFile = fs.createReadStream('rawData/characteristics.csv');
const reviewsFile = fs.createReadStream('rawData/reviews.csv');

/**--------------- Add url to photo----worked✅----- */
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



/*-------------Reset PHOTOS FIELD - worked ✅-----------------*/
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



/*-------------DELETE PHOTOS FIELD - worked ✅ ----------------*/
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
          const {id, name} = results.data
          console.log(id, name)
          parser.pause();
          db.collection(charReviews).updateMany({'characteristic_id': Number(id)}, {$set:{'characteristic': name}})
            .then(() => parser.resume())
        },
        complete: (results) => {
          callback(' Add characteristic to char_reviews successfully !')
        }
      });
  });
};


const meta = ()=> {
    MongoClient.connect(url, function(err, client) {
      if (err) callback(err)
        const db = client.db("reviews");
        // run reviews file, take in reviews id, product_id, rating, recommend
        // PapaParser.parse(reviewsFile, {
        //   encoding: 'utf-8',
        //   delimiter: ',',
        //   header: true,

        //   step:(results, parser) => {
        //     parser.pause();
        //     reviewsFile.pause();
        //     const {id, rating, product_id} = results.data;
        //     db.collection(charReviews).find({'review_id': Number(results.data.id)}).toArray().then(data => {
              // meta
              //findOneAndUpdate {product_id:...., rating:{1, 2, 3, 4...,5   } , characteristic:{'dd': ++} }
              db.collection('reviews').find({product_id:4}).toArray()
            .then(data => console.log(data))

    //           reviewsFile.resume();
    //           parser.resume();
    //         })
    //       },
    //       complete: (results) => {
    //         callback('Completed!')
    //       }
    //     });
    // });
   });
};



const getReview = (product_id, count = 5, sort = 'relevant', page = 1, callback) => {
  MongoClient.connect(url, function(err, client) {
    if (err) callback(err)
    const db = client.db("reviews");
    db.collection('reviews').find({product_id:4}).toArray()
      .then(data => {
        if (data.length === 0) {
          callback({product: 2, page, count, results:[]})
        } else {
          const totalPages = Math.ceil(data.length/ count);
          totalPages < 1 ? callback(data) : callback(data.slice(page*count - count, page*count))
        }
      });
  });
};


module.exports.getReview = getReview;















