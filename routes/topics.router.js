const topicsRouter = require('express').Router();
const { selectTopics } = require('../controllers/topics.controllers');

topicsRouter
  .route('/')
  .get(selectTopics)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });

module.exports = topicsRouter;
