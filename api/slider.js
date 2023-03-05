const { getDb } = require('./db.js');
const { jaccard } = require('./helper.js');

async function getSliderQuestion(_, { id }) {
  const sliderQn = await getDb()
    .collection('slider_captcha')
    .findOne({ id: parseInt(id) });
  return sliderQn;
}

module.exports = {
  getSliderQuestion,
};
