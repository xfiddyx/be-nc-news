const getTopics = require('../models/topics.models');

const selectTopics = (req, res, next) => {
  getTopics().then(result => {
    console.log('im here');
  });
};

module.exports = { selectTopics };
