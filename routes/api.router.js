const apiRouter = require('express').Router();
const topicsRouter = require('./topics.router');
const usersRouter = require('./users.router');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');

const endPoints = require('../endpoints.json');

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter
  .route('/')
  .get((req, res, next) => {
    res.status(200).json({ endPoints });
  })
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });

module.exports = apiRouter;
