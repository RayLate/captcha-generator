const fs = require('fs');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const path = require('path');
const PORT = process.env.API_SERVER_PORT || 5000;
const url = process.env.MONGODB_URL;
const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
console.log('CORS setting:', enableCors);

const app = express();

let db;

// insert API functions

// Recaptcha
async function getRecaptchaQuestion(_, { id }) {
  const recaptchaQn = await db
    .collection('recaptcha')
    .findOne({ id: parseInt(id) });
  return recaptchaQn;
}
async function validateRecaptchaAnswer(_, { id, answer }) {
  const recaptchaQn = await db
    .collection('recaptcha')
    .findOne({ id: parseInt(id) });
  return jaccard(new Set([...answer]), new Set([...recaptchaQn.answer]));
}

// HCaptcha
async function getHcaptchaQuestion(_, { id }) {
  const hecaptcha = await db
    .collection('hcaptcha')
    .findOne({ id: parseInt(id) });
  return hecaptcha;
}
async function validateHcaptchaAnswer(_, { id, answer }) {
  const hecaptcha = await db
    .collection('hcaptcha')
    .findOne({ id: parseInt(id) });
  return jaccard(new Set([...answer]), new Set([...hecaptcha.answer]));
}

function jaccard(set1, set2) {
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

// connect to db
async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDb at', url);
  db = client.db('captchaData');
}

const resolvers = {
  Query: {
    getRecaptchaQuestion,
    validateRecaptchaAnswer,
    getHcaptchaQuestion,
    validateHcaptchaAnswer,
  },
};

// set up graphql
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./api/schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  // disable cors during development
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    })
  );
}

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

  await connectToDb();

  app.listen(PORT, () => {
    console.log(`API started on port - ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('ERROR:', err);
});
