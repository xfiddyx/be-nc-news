const apiRouter = require('express').Router();
const topicsRouter = require('./topics.router');
const usersRouter = require('./users.router');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter
  .route('/')
  .get((req, res, next) => {
    res.status(200).send({
      'GET /api': {
        description:
          'serves up a json representation of all the available endpoints of the api'
      },
      'GET /api/topics': {
        description: 'serves an array of all topics',
        queries: [],
        exampleResponse: {
          topics: [{ slug: 'football', description: 'Footie!' }]
        }
      },
      'GET /api/articles': {
        description: 'serves an array of all topics',
        queries: ['author', 'topic', 'sort_by', 'order'],
        exampleResponse: {
          articles: [
            {
              title: 'Seafood substitutions are increasing',
              topic: 'cooking',
              author: 'weegembump',
              body: 'Text from the article..',
              created_at: 1527695953341
            }
          ]
        }
      },
      'GET /users/:username': {
        description: 'serves an array of the details for the selected user',
        queries: [],
        exampleResponse: {
          user: {}
        }
      }
    });
  })
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });

module.exports = apiRouter;
