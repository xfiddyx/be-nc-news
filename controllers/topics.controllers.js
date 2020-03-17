const { getTopics } = require('../models/topics.models');

const selectTopics = (req, res, next) => {
  getTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

module.exports = { selectTopics };
