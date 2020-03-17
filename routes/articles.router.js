const articlesRouter = require('express').Router();
const { selectArticles } = require('../controllers/articles.controllers');

articlesRouter.get('/:article_id', selectArticles);

module.exports = articlesRouter;
