// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/";

//  const getAll = (callback) => {
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;

//     const dbo = db.db("reviews");

//     // dbo.collection('reviews').find({product_id:20}).toArray().then(data => callback(data))
//     // ,function(err, result) {
//     //   if (err) throw err;
//     //  callback(null, result)
//     //   db.close();
//     // };
//     dbo.collection('reviews').updateMany({}, {$set: {photos:[]}}).then(data => callback(data))
//   });
// }
// module.exports.getAll = getAll;



