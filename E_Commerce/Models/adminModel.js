const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName="ECommerce"
const addAdmin=async(record)=>{
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('adminsCollection');
    console.log('record')
    console.log(record)
    const insertResult=await collection.insertOne(record);
    return insertResult
}
const selectOneAdmin=async(record)=>{
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('adminsCollection');
    const findResult=await collection.findOne(
        {
            email:record.email
        });
    return findResult
    }
const loginAdmin=async(record)=>{
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('adminsCollection');
    const findResult=await collection.findOne(
        {
            email:record.email
        });
    return findResult
}
const updateAdmin=async (record)=>{
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('adminsCollection');
    const updateResult = await collection.updateOne({ email: record.email }, { $set: record });
    return updateResult
}
const deleteAdmin=async (record)=>{
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('adminsCollection');
    const deleteResult = await collection.deleteOne({ email: record.email });
    return deleteResult
}
const getAll=async (record)=>{
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('adminsCollection');
    const findResult = await collection.find({}).toArray();
    console.log('from Model............')
    console.log(findResult)
    return findResult
}
module.exports={
    addAdmin,
    selectOneAdmin,
    updateAdmin,
    loginAdmin,
    deleteAdmin,
    getAll
}