const express = require('express');
const router = express.Router();
const { getReview, getMeta, addReview, updateField} = require('../model/reviews_service');
const {Review, Meta}  = require('../model/reviewsModel');

router.get('/', (req, res) => {
  const request = 'product_id' in req.query ? req.query : req.body
  let {product_id, count, page, sort} = request;
  if (product_id === undefined || (req.body.product_id && typeof(product_id)!== 'number') || sort && !['helpful', 'relevant', 'newest'].includes(sort) || (count && count <1) || (page && page<1)) {
    res.status(404).json('Invalid input');
  } else {
    getReview(Number(product_id), Number(page), Number(count), sort,  (err, result) => {
      err ? res.status(404).json('someting went wrong :/') : res.status(200).json(result)
    })
  }
});

router.get('/meta', (req, res) => {
  const request = 'product_id' in req.query ? req.query : req.body
  let { product_id } = request;
  if(product_id === undefined || (req.body.product_id && typeof(product_id) !== 'number')) {
    res.status(404).json('invalid product_id')
  } else {
    getMeta(Number(product_id), (err, result) => {
      err ? res.status(404).json('someting went wrong :/') : res.status(201).json(result)
    })
  }
});

router.post('/', (req, res) => {
  const checkValidation = ({product_id, rating, summary, body, recommend, name, email, photos, characteristics}) => {
    if(typeof(product_id) !== 'number' || (typeof(rating) !== 'number') || rating < 1 || rating > 5) {
      console.log(1)
      return false;
    }
    if (summary && typeof(summary) !== 'string') {
      console.log(2)
      return false;
    }
    if ([body, name, email].some(el => typeof(el) !== 'string')) {
      console.log(3)
      return false;
    }
    if(!Array.isArray(photos)) {
      console.log(photos)
      return false;
    }
    if (!Array.isArray(characteristics) && typeof(characteristics) !== 'object') {
      console.log(5)
      return false;
    } else {
      return true;
    }
  }
  if(!checkValidation(req.body)) {
    res.status(404).json('Invalid input')
  } else {
    addReview(req.body,(err, result) => err ? res.status(404).json('someting went wrong :/') : res.status(201).json('created'))
  }

});

router.put('/:review_id/:field', (req, res) => {
  const {review_id, field} = req.params;
  Number(review_id) < 1 || isNaN(Number(review_id)) || !['helpful', 'report'].includes(field) ? res.status(404).json('Invalid request') :
   updateField(Number(review_id), field, (err, result) => {
     err
     ? res.status(404).json('something went wrong :/')
     : res.status(204).send();
   });
});

module.exports = router ;

