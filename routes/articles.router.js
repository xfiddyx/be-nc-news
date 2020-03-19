const articlesRouter = require('express').Router();
const {
  selectArticles,
  patchArticle,
  postArticleComment,
  getComments,
  selectAllArticles
} = require('../controllers/articles.controllers');

articlesRouter.get('/', selectAllArticles);

articlesRouter
  .route('/:article_id')
  .get(selectArticles)
  .patch(patchArticle)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });

articlesRouter
  .route('/:article_id/comments')
  .get(getComments)
  .post(postArticleComment)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });

module.exports = articlesRouter;
