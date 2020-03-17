const usersRouter = require('express').Router();

const selectUser = require('../controllers/user-controller');

usersRouter.get('/:username', selectUser);
