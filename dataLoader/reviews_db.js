const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/reviews')
  .then(() => {
    console.log('<<----Yeah!! Connected to MongoDB!---->>');
  })
  .catch(err => {
    console.log(err);
  });

  mongoose.set('debug', true);

  const reviews =  new mongoose.Schema({
    product_id: Number,
    reviews:[
        {
          id: {type: Number, required: true},
          body: {type: String, max: 1000, trim: true, required: true},
          date: {type: Date, default: Date.now},
          rating: {type: Number, required: true},
          recommend: {type: Boolean, required: true},
          reviewName: {type: String, trim: true, required: true},
          email: {type: String, trim: true, required: true},
          helpfulness: {type: Number, default: 0},
          response: {type: String, default: null},
          photos:[{id: Number, thumbnail_url:String}],
          characteristics: {type: Object, required: true}
        }
    ]
  });

  module.exports = mongoose.model('product_review', reviews);






