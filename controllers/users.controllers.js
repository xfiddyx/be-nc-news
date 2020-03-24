const { getUser } = require('../models/users.models');

const selectUser = (req, res, next) => {
  getUser(req.params.username)
    .then(([user]) => {
      if (!user) {
        return next(404);
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { selectUser };
