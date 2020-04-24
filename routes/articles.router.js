const articlesRouter = require('express').Router();
const {
  selectArticle,
  patchArticle,
  postArticleComment,
  getComments,
  selectAllArticles,
  getRandomArticle,
  postArticle,
  deleteArticle,
} = require('../controllers/articles.controllers');

articlesRouter
  .route('/')
  .get(selectAllArticles)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });

articlesRouter
  .route('/article')
  .get(getRandomArticle)
  .post(postArticle)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });

articlesRouter
  .route('/:article_id')
  .get(selectArticle)
  .patch(patchArticle)
  .delete(deleteArticle)
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
