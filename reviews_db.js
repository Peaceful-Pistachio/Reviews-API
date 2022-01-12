const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/reviews',
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('<<----Yeah!! Connected to MongoDB!---->>');
  })
  .catch(err => {
    console.log(err);
  });

  mongoose.set('debug', true);
  //const reviews = mongoose.Schema({product_id: Number, reviews:Object}); //review Object should have all data

 // in detail

  const reviews =  new mongoose.Schema({
    product_id: Number,
    reviews:[
        {
          id: {type: Number, required: true}
          body: {type: String, max: 1000, trim: true, required: true}
          date: {type: Date, default: Date.now},
          rating: {type: Number, required: true},
          recommend: {type: Boolean, required: true},
          reviewName: {type: String, trim: true, required: true},
          email: {type: String, trim: true, required: true},
          helpfulness: {type: Number, default: 0},
          response: String,
          photos:[id: Number, thumbnail_url:String]
          characteristics: {
            size: Number,
            width: Number,
            comfort: Number,
            Quality: Number,
            length: Number,
            fit: Number
          }
        }
    ]
  });

  module.exports = mongoose.model('product_review', reviews);

  // const product_review = mongoose.model('product_review', reviews);










//   //get product reviews
// const getReview = (currentProductId, callback) => {
//   reviews.find({product_id: currentProductId}).exec((err, result) => {
//     if(err) {
//       callback(null, err)
//     } else {
//       callback(result.reviews)
//     }
//   })
// }

