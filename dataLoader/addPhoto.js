const addTheRestProductToMeta = (callback) => {
  MongoClient.connect(url, function(err, client) {
    if (err) callback(err, null)
    const db = client.db("reviews");
    PapaParser.parse(allCharsFile, {
      encoding: 'utf-8',
      delimiter: ',',
      header: true,

      step: (results, parser) => {
        parser.pause();
        allCharsFile.pause();
        const {product_id, id, reviewer_name} = results.data;
        db.collection('reviews_meta').findOne({product_id:Number(product_id)}).then(result => {
          if(result === null) {
            Char.find({product_id: Number(product_id)}).exec((err, productChar) => {
              const temp = {};
              productChar.forEach(el => {
                  const {name, id} = el;
                  temp[name] = {id, value:0}
              });
              new Meta({product_id: Number(product_id), characteristics: temp, rating:{}, recommended:{}}).save().then(result => {
                console.log(result)
                allCharsFile.resume();
                parser.resume();
              })
            });
          } else {
            allCharsFile.resume();
            parser.resume();
          }
        });
      },
      complete: (results) => {
        callback(null,' Done !')
      }
    });
  });
};

module.exports.resetPhotoFieldReviews = resetPhotoFieldReviews;
module.exports.addPhotoReviews = addPhotoReviews;
