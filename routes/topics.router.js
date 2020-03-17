const topicsRouter = require('express').Router();
const { selectTopics } = require('../controllers/topics.controllers');

topicsRouter.get('/', selectTopics);

module.exports = topicsRouter;
