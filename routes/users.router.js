const usersRouter = require('express').Router();

const { selectUser } = require('../controllers/users.controllers');

usersRouter.get('/:username', selectUser);

module.exports = usersRouter;
