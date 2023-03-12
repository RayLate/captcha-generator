const { getDb } = require('./db.js');
const { ObjectId } = require('mongodb');

async function getSliderQuestion(_, { id }) {
  const sliderQn = await getDb()
    .collection('slider_captcha')
    .findOne({ id: parseInt(id) });
  return sliderQn;
}

async function updateSliderAnswer(_, { id, answer }) {
  const result = await getDb()
    .collection('slider_captcha')
    .updateOne({ _id: new ObjectId(id) }, { $set: { answer: answer } });
  if (result.modifiedCount == 1) {
    console.log(result);
    return true;
  }
  console.log('Update failed');
  return false;
}

module.exports = {
  getSliderQuestion,
  updateSliderAnswer,
};
