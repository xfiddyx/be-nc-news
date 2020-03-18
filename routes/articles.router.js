const articlesRouter = require('express').Router();
const {
  selectArticles,
  patchArticle,
  postArticleComment,
  getComments
} = require('../controllers/articles.controllers');

articlesRouter
  .route('/:article_id')
  .get(selectArticles)
  .patch(patchArticle);

articlesRouter
  .route('/:article_id/comments')
  .get(getComments)
  .post(postArticleComment);

module.exports = articlesRouter;
