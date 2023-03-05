const { getDb } = require('./db.js');
const { jaccard } = require('./helper.js');

async function getHcaptchaQuestion(_, { id }) {
  const hecaptcha = await getDb()
    .collection('hcaptcha')
    .findOne({ id: parseInt(id) });
  return hecaptcha;
}
async function validateHcaptchaAnswer(_, { id, answer }) {
  const hecaptcha = await getDb()
    .collection('hcaptcha')
    .findOne({ id: parseInt(id) });
  return jaccard(new Set([...answer]), new Set([...hecaptcha.answer]));
}

module.exports = {
  getHcaptchaQuestion,
  validateHcaptchaAnswer,
};
