import { promisifyAll } from 'bluebird';
const MongoClient = promisifyAll(require('mongodb')).MongoClient;
const url = "mongodb://localhost:27017/";
const databaseObj = "EmailInfo";
const collectionObj = "EmailInfo";

export async function retrieveUserIdObjects() {
    const db = await MongoClient.connectAsync(`${url}`);
    const dbo = await db.db(databaseObj);
    const collection = await dbo.collection(collectionObj);
    const colle = await collection.findAsync({});
    const result = await colle.toArray();
    await db.close();
    return Promise.resolve(result);
}
export async function insertObject(email: string, pincodes_:Number[]) {
    const db = await MongoClient.connectAsync(`${url}`);
    const dbo = await db.db(databaseObj);
    const collection = await dbo.collection(collectionObj);
    const myobj = { emailId: email, pincodes:  pincodes_};
    await collection.insertOneAsync(myobj);
    await db.close();
}