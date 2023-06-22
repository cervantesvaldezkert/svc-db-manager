var MongoClient = require('mongodb').MongoClient;
const mongoDBConfig = require('../cofigs/tasks.mongodb.config');
const uri = mongoDBConfig.connectionString;
const client = new MongoClient(uri);

//method for inserting document in mongoDB
//supply $data as array of objects
//supply specific dbName and collection 
exports.insert = async (data, dbName, collectionName) => {
  try {
      const collection = await initConnection(dbName, collectionName);

      const insertManyResult = await collection.insertMany(data);

      await client.close();
      return insertManyResult;
    } catch (err) {
      console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }

}

//method for finding document by id in mongoDB
//supply docId
//supply specific dbName and collection 
exports.findByDocId = async (docId, dbName, collectionName) => {
  try {
  const collection = await initConnection(dbName, collectionName);
  const findQuery = { docId: { $eq: docId } };
  let result = [];

    const cursor = await collection.find(findQuery).sort({ logDate: 1 });
    await cursor.forEach(recipe => {
      result.push(recipe);
    });
    
    await client.close();
    return result;
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }
}

//method for fetching all document without limit in mongoDB
//supply specific dbName and collection 
exports.findAll = async (dbName, collectionName) => {
  try {
    const collection = await initConnection(dbName, collectionName);
    let result = [];

    const cursor = await collection.find().sort({ logDate: 1 });
    await cursor.forEach(data => {
      result.push(data);
    });

    await client.close();
    return result;
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }
}

//method for updating document without limit in mongoDB
//supply specific dbName and collection 
exports.update = async (req, dbName, collectionName) => {
  try {
    const collection = await initConnection(dbName, collectionName);
    const findOneQuery = { docId: req.docId };
    const updateDoc = { $set: req.data };
    const updateOptions = { returnOriginal: false };

    const updateResult = await collection.findOneAndUpdate(
      findOneQuery,
      updateDoc,
      updateOptions,
    );

    await client.close();
    return updateResult
  } catch (err) {
    console.error(`Something went wrong trying to update one document: ${err}\n`);
  }
}

//method for deleting document by DocId in mongoDB
//supply docId
//supply specific dbName and collection 
exports.deleteByDocId = async (docId, dbName, collectionName) => {
  try {
    const collection = initConnection(dbName, collectionName);
    const deleteQuery = { docId: { $eq: docId } };

    const deleteResult = await collection.deleteMany(deleteQuery);

    await client.close();
    return deleteResult;
  } catch (err) {
    console.error(`Something went wrong trying to delete documents: ${err}\n`);
  }
  
}

//generic function to initialize connection to mongodb
initConnection = async(dbName, collectionName) => {
  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  return collection;
}