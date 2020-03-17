const connection = require('../connection');

const getTopics = () => {
  return connection.select('*').from('topics');
};

module.exports = { getTopics };
