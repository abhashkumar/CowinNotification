var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;
var url = "mongodb://localhost:27017/";
var databaseObj = "EmailInfo";
var collectionObj = "EmailInfo";

async function retrieveUserIdObjects() {
    var db = await MongoClient.connectAsync(`${url}`);
    var dbo = await db.db(databaseObj);
    var collection = await dbo.collection(collectionObj);
    var colle = await collection.findAsync({});
    var result = await colle.toArray();
    await db.close();
    return Promise.resolve(result);
}
async function insertObject(email, pincodes_) {
    var db = await MongoClient.connectAsync(`${url}`);
    var dbo = await db.db(databaseObj);
    var collection = await dbo.collection(collectionObj);
    var myobj = { emailId: email, pincodes:  pincodes_};
    await collection.insertOneAsync(myobj);
    await db.close();
}
exports.retrieveUserIdObjects = retrieveUserIdObjects;
exports.insertObject = insertObject;