var MongoClient = require('mongodb').MongoClient;
const mongoDBConfig = require('../cofigs/tasks.mongodb.config');
const uri = mongoDBConfig.connectionString;
const client = new MongoClient(uri);

//dynamic method for inserting document in mongoDB
//supply $data as array of objects
//supply specific dbName and collection 
exports.insert = async (data, dbName, collectionName) => {

  try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      const insertManyResult = await collection.insertMany(data);
      console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);

      return insertManyResult;
    } catch (err) {
      console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }

}

exports.findByDocId = async (docId, dbName, collectionName) => {

  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  console.log(docId);

  const findQuery = { docId: { $eq: docId } };

  let result = [];

  try {
    const cursor = await collection.find(findQuery).sort({ logDate: 1 });
    await cursor.forEach(recipe => {
      result.push(recipe);
    });
    
    return result;
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }
}

exports.findAll = async (dbName, collectionName) => {

  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  let result = [];

  try {
    const cursor = await collection.find().sort({ logDate: 1 });
    await cursor.forEach(data => {
      result.push(data);
    });

    return result;
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }
}

exports.update = async (req, dbName, collectionName) => {

  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const findOneQuery = { docId: req.docId };
  const updateDoc = { $set: req.data };
  const updateOptions = { returnOriginal: false };

  try {
    const updateResult = await collection.findOneAndUpdate(
      findOneQuery,
      updateDoc,
      updateOptions,
    );

    return updateResult
    
  } catch (err) {
    console.error(`Something went wrong trying to update one document: ${err}\n`);
  }
}

exports.deleteByDocId = async (docId, dbName, collectionName) => {

  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  const deleteQuery = { docId: { $eq: docId } };

  try {
    const deleteResult = await collection.deleteMany(deleteQuery);
    console.log(`Deleted ${deleteResult.deletedCount} documents\n`);
    return deleteResult;
  } catch (err) {
    console.error(`Something went wrong trying to delete documents: ${err}\n`);
  }
  

}
