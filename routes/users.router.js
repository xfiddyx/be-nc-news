const usersRouter = require('express').Router();

const { selectUser } = require('../controllers/users.controllers');

usersRouter
  .route('/:username')
  .get(selectUser)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });
module.exports = usersRouter;
