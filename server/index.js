const express = require('express');
const app = express();
const port = 3001 || process.env.port;
const bodyParser = require('body-parser');
const reviewsRouter = require('../controller');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/reviews', reviewsRouter);

app.listen(port, () => console.log(`listening to port ${port}`))

module.exports.app = app;