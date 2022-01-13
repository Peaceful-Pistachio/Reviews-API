const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json('You are on reviews route')
});
router.get('/meta', (req, res) => {
  res.status(200).json('getting meta')
})

// router.post('/:review_id', (req, res) => {
//   res.status(200).json('getting meta')
// })

module.exports = router ;

