import { promisifyAll } from 'bluebird';
const MongoClient = promisifyAll(require('mongodb')).MongoClient;
// use when starting application locally
let mongoUrlLocal = "mongodb://admin:admin@localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:admin@mongodb";

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const databaseObj = "EmailInfo";
const collectionObj = "EmailInfo";

export async function retrieveUserIdObjects() {
    const db = await MongoClient.connectAsync(mongoUrlDocker, mongoClientOptions);
    const dbo = await db.db(databaseObj);
    const collection = await dbo.collection(collectionObj);
    const colle = await collection.findAsync({});
    const result = await colle.toArray();
    await db.close();
    return result;
}
export async function insertObject(email: string, district_: Number) {
    const db = await MongoClient.connectAsync(mongoUrlDocker, mongoClientOptions);
    const dbo = await db.db(databaseObj);
    const collection = await dbo.collection(collectionObj);
    const myobj = { emailId: email, district : district_};
    await collection.insertOneAsync(myobj);
    await db.close();
}