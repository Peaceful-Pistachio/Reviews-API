var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

 const getAll = (callback) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("reviews");
    dbo.collection('characteristics').findOne({product_id:54230},function(err, result) {
      if (err) throw err;
     callback(null, result)
      db.close();
    });
  });
}
module.exports.getAll = getAll;



