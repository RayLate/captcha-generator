const { getDb } = require('./db.js');
const { jaccard } = require('./helper.js');

async function getRecaptchaQuestion(_, { id }) {
  const recaptchaQn = await getDb()
    .collection('recaptcha')
    .findOne({ id: parseInt(id) });
  return recaptchaQn;
}

async function validateRecaptchaAnswer(_, { id, answer }) {
  const recaptchaQn = await getDb()
    .collection('recaptcha')
    .findOne({ id: parseInt(id) });
  return jaccard(new Set([...answer]), new Set([...recaptchaQn.answer]));
}

module.exports = {
  getRecaptchaQuestion,
  validateRecaptchaAnswer,
};
