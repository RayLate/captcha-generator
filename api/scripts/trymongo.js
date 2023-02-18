require('dotenv').config();
const { MongoClient } = require('mongodb');

const url =
  process.env.MONGODB_URL ||
  'mongodb+srv://badermiy:VPaOKNEk3eSLsktS@cluster0.z6xorqs.mongodb.net/?retryWrites=true&w=majority';

async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB, beginning CRUD Testing @', url);
    const db = client.db();
    const collection = db.collection('test');
    console.log("Creating 'test' collection for testing");
    const testData = {
      sn: 1,
      name: 'Admin',
      phone: '123',
      created: new Date(),
    };

    console.log('Add Test');
    const result = await collection.insertOne(testData);
    console.log('Result of insert:\n', result.insertedId);

    console.log('Read Test');
    let docs = await collection.findOne({ _id: result.insertedId });
    console.log(`Result of find ${result.insertedId}:`, docs);

    console.log('Delete Test');
    const deleted = await collection.deleteOne({ _id: result.insertedId });
    console.log(`Result of delete ${result.insertedId}:`, deleted.result);

    docs = await collection.findOne({ _id: result.insertedId });
    console.log(`Result of find ${result.insertedId}:\n`, docs);
    await collection.drop();
    console.log("'test' collection dropped successfully");
  }
  catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithAsync();
