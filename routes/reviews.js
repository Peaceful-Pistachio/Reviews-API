const express = require('express');
const router = express.Router();
const { getReview } = require('../dataLoader/csv_parser.js');



router.get('/', (req, res) => {
  const {product_id, count, page, sort} = req.query
 
  if((sort && !['helpful', 'relevant', 'newest'].includes(sort))  || (count && count < 1) || (page && page < 1)) {
    if (count < 1) {
      res.status(404).json('count must be greater that 0');
    }
      else if (page < 1) {
      res.status(404).json('page must be greater that 0');
    } else {
      res.status(404).json('invalid sort')
    }
  } else {
    getReview(product_id, page, count, sort,  (err, result) => {
      err ? res.status(404).json('someting went wrong :/') : res.status(200).json(result)
    })
  }

});

router.get('/meta', (req, res) => {
  res.status(200).json('getting meta')
})

// router.post('/:review_id', (req, res) => {
//   res.status(200).json('getting meta')
// })

module.exports = router ;

