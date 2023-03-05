require('dotenv').config();
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const {
  getRecaptchaQuestion,
  validateRecaptchaAnswer,
} = require('./recaptcha.js');
const {
  getHcaptchaQuestion,
  validateHcaptchaAnswer,
} = require('./hcaptcha.js');
const { getSliderQuestion } = require('./slider.js');

const resolvers = {
  Query: {
    getRecaptchaQuestion,
    validateRecaptchaAnswer,
    getHcaptchaQuestion,
    validateHcaptchaAnswer,
    getSliderQuestion,
  },
};

// set up graphql
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./api/schema/schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

async function installAPI(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  await server.start();
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installAPI };
