const express = require('express');
const app = express();
const port = 3001 || process.env.port;
const bodyParser = require('body-parser');
const reviewsRouter = require('../controller');
const {addReviewsToProduct} = require('../dataLoader/addMeta.js');
const {deleteProductMeta} = require('../dataLoader/cleanUpHelper.js')


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/reviews', reviewsRouter);
app.get('/', (req, res) => {
  addReviewsToProduct((err, result) => err ? res.status(404) : res.status(200).json('DONE'))
});

app.get('/clean', (req, res) => {
  deleteProductMeta((err, result) => err ? res.status(404) : res.status(200).json(result))
})
app.listen(port, () => console.log(`listening to port ${port}`))

