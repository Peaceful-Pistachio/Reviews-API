const mongoose = require('mongoose');
const hintPlugin = require('mongoose-hint')
mongoose.connect('mongodb://172.31.23.186:27017/reviews');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  id: {type: Number, required: true},
  product_id: {type: Number, required: true},
  rating: {type: Number, required: true},
  date: {type: Date, default: Date.now},
  summary: {type: String, maxLength: 20},
  body: {type: String, required: true, maxLength: 1000},
  recommend: {type: Boolean, required: true},
  reported: {type: Boolean, default: false},
  reviewer_name: {type: String, required: true, maxLength: 60},
  reviewer_email: {type: String, required: true, maxLength: 60},
  response: {type: String, default: 'null' },
  helpfulness: {type: Number, default: 0},
  photos: { type: Array, default: [] }
});

const ReviewMetaSchema = new Schema({
  product_id: {type: Number, required: true},
  rating: Object,
  recommended: Object,
  characteristics: {type: Object, required: true},
  totalReviews: {type: Number, default: 0}
}, {collection: 'reviews_meta'});

const productChar = new Schema({
 id:Number,
 product_id: Number,
 name: String
}, {collection: 'characteristics'});

const lastID = new  Schema({
  review_id: Number,
  photo_id: Number
}, {collection:'reviews_lastID'});


const LastID = mongoose.model('LastID', lastID);
const Char = mongoose.model('Char', productChar)
const Review = mongoose.model('Review', ReviewSchema);
const Meta = mongoose.model('Meta', ReviewMetaSchema);

const PRODUCT_ID = {
  product_id: 1,
}
ReviewMetaSchema.index(PRODUCT_ID)
ReviewMetaSchema.plugin(hintPlugin.find, [
  PRODUCT_ID
]);

ReviewSchema.index(PRODUCT_ID)
ReviewSchema.plugin(hintPlugin.find, [
  PRODUCT_ID
]);

module.exports = {Review, Meta, Char, LastID}
