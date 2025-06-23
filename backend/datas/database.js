// const { MongoClient } = require("mongodb");

// const uri = `mongodb+srv://minhncfx20455:XhzTflYc2PxvSjcf@cluster0.qr483ce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// let _db;
// const client = new MongoClient(uri);
// // const client = new MongoClient(uri);
// const mongoConnect = async function (callback) {
//   try {
//     await client.connect();
//     _db = client.db("shop");
//     callback();
//   } catch (err) {
//     console.log(err);
//   }
// };

// const getDb = function () {
//   if (_db) {
//     return _db;
//   }
//   return console.log("has err");
// };
// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
// // exports.db = connectDb;
