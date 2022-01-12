const express = require('express');
const app = express();
const port = 3001 || process.env.port;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('test')
})


app.listen(port, () => console.log(`listening to port ${port}`))

