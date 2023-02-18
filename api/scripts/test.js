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
    const db = client.db('captchaData');
    const collection1 = db.collection('recaptcha');
    await collection1.findOne({ id: 0 }).then((res) => console.log(res));

    const collection2 = db.collection('hcaptcha');
    await collection2.findOne({ id: 0 }).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithAsync();
