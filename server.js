require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDb } = require('./api/db.js');
const { installAPI } = require('./api/api_handler.js');
const path = require('path');
const PORT = process.env.API_SERVER_PORT || 5000;

const app = express();

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
  // await server.start();
  // server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
  await installAPI(app);
  await connectToDb();

  app.listen(PORT, () => {
    console.log(`API started on port - ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('ERROR:', err);
});
