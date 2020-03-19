const apiRouter = require('express').Router();
const topicsRouter = require('./topics.router');
const usersRouter = require('./users.router');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');

apiRouter.get('/', (req, res, next) => {
  res
    .status(200)
    .send({
      endPoints: {
        topics: { GET: 'retrieves all topics' },
        users: {
          GET:
            'retrieves the information held on the user requested on the parametric endpoint e.g  /api/users/john_doe'
        },
        articles: {
          GET: 'retrieves all articles',
          GET:
            'retrieves the information held on the article requested on the parametric endpoint e.g /api/articles/1',
          PATCH:
            'retrieves the updated information held on an article following successful PATCH request e.g /api/articles/1',
          POST:
            'retrieves the updated information held on an articles comments following successful POST request e.g. /api/articles/1/comments',
          GET:
            'retrieves information held on an article following successful GET request e.g. /api/articles/1/comments'
        },
        comments: {
          PATCH:
            'retrieves updated information held on comment requested at parametric endpoint e.g. /api/comments/1',
          DELETE:
            'deletes all information related to comment requested at parametric endpoint e.g./api/comments/1 returns no information if successful.'
        }
      }
    });
});
// GET /api/topics

// GET /api/users/:username

// GET /api/articles/:article_id
// PATCH /api/articles/:article_id

// POST /api/articles/:article_id/comments
// GET /api/articles/:article_id/comments

// GET /api/articles

// PATCH /api/comments/:comment_id
// DELETE /api/comments/:comment_id

// GET /api

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
