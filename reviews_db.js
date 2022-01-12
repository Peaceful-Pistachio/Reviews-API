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

  const reviews =  mongoose.Schema({
    product_id: Number,
    reviews:[
        {
          id: Number
          body: String,
          date: Date,
          rating: Number,
          recommend: Boolean,
          reviewName: String,
          email: String,
          helpfulness: Number,
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

  const product_review = mongoose.model('product_review', reviews);










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
