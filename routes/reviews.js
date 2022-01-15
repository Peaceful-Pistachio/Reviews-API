const express = require('express');
const router = express.Router();
const { getReview } = require('../dataLoader/csv_parser.js');



router.get('/', (req, res) => {
  const {product_id, count, page, sort} = req.query
  if(!['helpful', 'relevant', 'newest'].include(sort) || (count && count < 1) || (page && page < 1 ) {
    res.status(404)
  }
  res.status(200).json('You are on reviews route')
});
router.get('/meta', (req, res) => {
  res.status(200).json('getting meta')
})

// router.post('/:review_id', (req, res) => {
//   res.status(200).json('getting meta')
// })

module.exports = router ;

