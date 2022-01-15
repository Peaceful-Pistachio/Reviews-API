const express = require('express');
const app = express();
const port = 3001 || process.env.port;
const bodyParser = require('body-parser');

const reviewsRouter = require('../routes/reviews');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/reviews', reviewsRouter);

app.get('/clearPhotos', (req, res) => {

    res.status(200).json('hihi')

});

app.get('/addChar', (req, res) => {
  addNameToCharReview(result => res.status(200).json(result))
});


app.listen(port, () => console.log(`listening to port ${port}`))

