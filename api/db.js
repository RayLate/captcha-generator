require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;


async function connectToDb() {
  const url = process.env.MONGODB_URL;
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDb at', url);
  db = client.db('captchaData');
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };