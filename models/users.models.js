const connection = require('../connection');

const getUser = username => {
  return connection
    .select('*')
    .from('users')
    .where('username', username);
};

module.exports = { getUser };
