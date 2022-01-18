const PapaParser = require('papaparse');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const reviewsDB = 'reviews'; //collections
const reviewsMeta = 'reviews_meta';



module.exports = {
  getReview: (product_id, page, count, sort = 'relevant', callback) => {
    page = page || 1;
    count = count || 5
    MongoClient.connect(url, (err, client) => {
      if (err) callback(err, null)
      const db = client.db("reviews");
      db.collection(reviewsDB).find({product_id}).toArray()
        .then(data => {
          data.map(el => {
            delete el._id;
            return el
          })
          if (sort === 'newest') {
            data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          } else if (sort === 'helpful') {
            data = data.sort((a, b) => b.helpfulness - a.helpfulness);
          }
            callback(null, {product_id, page, count, results:data.slice(page*count - count, page*count)});
        });
    });
  },

  getMeta: (product_id, callback) => {
    MongoClient.connect(url, (err, client) => {
      if(err) callback(err, null)
      const db = client.db('reviews');
      db.collection(reviewsMeta).findOne({product_id}).then(data => {
        delete data._id;
        delete data.totalReviews;
        callback(null, data);
      })
    })
  },
  addReview:(callback) => {
    MongoClient.connect(url, (err, client) => {
      if(err) callback(err, null)
      const db = client.db('reviews');
      db.collection(reviewsDB).findOne({}, {sort:{id:-1}}).then(data => {
      const lastID = data.id;
      // if there is pic
        db.collection()

      })

    })
  }
}




  // const totalPages = Math.ceil(data.length/ count);
  // if(totalPages < 1) {
  //   callback(null, data)
  // } else if (['newest', 'helpful'].includes(sort)) {
  //   const clientData = data.slice(page*count - count, page*count);
  //   const sortBy = sort === 'newest' ? 'date': 'helpfulness';
  //   callback(null, data.slice(clientData.sort((a,b) => b[sortBy] - a[sortBy])))
  // } else {
  //   callback(null, data.slice(page*count - count, page*count));
  // }

