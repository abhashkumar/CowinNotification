import { promisifyAll } from 'bluebird';
var MongoClient = promisifyAll(require('mongodb')).MongoClient;
var url = "mongodb://localhost:27017/";
var databaseObj = "EmailInfo";
var collectionObj = "EmailInfo";

export async function retrieveUserIdObjects() {
    var db = await MongoClient.connectAsync(`${url}`);
    var dbo = await db.db(databaseObj);
    var collection = await dbo.collection(collectionObj);
    var colle = await collection.findAsync({});
    var result = await colle.toArray();
    await db.close();
    return Promise.resolve(result);
}
export async function insertObject(email: string, pincodes_:Number[]) {
    var db = await MongoClient.connectAsync(`${url}`);
    var dbo = await db.db(databaseObj);
    var collection = await dbo.collection(collectionObj);
    var myobj = { emailId: email, pincodes:  pincodes_};
    await collection.insertOneAsync(myobj);
    await db.close();
}