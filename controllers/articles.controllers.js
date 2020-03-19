const {
  getArticles,
  updateArticle,
  postComment,
  retrieveComments,
  getAllArticles
} = require('../models/articles.models');

const selectAllArticles = (req, res, next) => {
  getAllArticles(req.query)
    .then(articles => {
      console.log(articles);
      if (!req.query.author && !req.query.topic) {
        res.status(200).send({ articles });
      } else if (req.query.author) {
        const article = articles.filter(
          article => article.author === req.query.author
        );
        res.status(200).send({ articles: article });
      } else if (req.query.topic) {
        const article = articles.filter(
          article => article.topic === req.query.topic
        );
        res.status(200).send({ articles: article });
      }
    })
    .catch(next);
};

const selectArticles = (req, res, next) => {
  getArticles(req.params.article_id)
    .then(article => {
      if (article.length === 0) {
        return next(404);
      } else res.status(200).send({ article });
    })
    .catch(next);
};

const patchArticle = (req, res, next) => {
  updateArticle(req.params.article_id, req.body)
    .then(updated_article => res.status(200).send({ updated_article }))
    .catch(next);
};

const postArticleComment = (req, res, next) => {
  postComment(req.body, req.params)
    .then(result => res.status(200).send({ comment: result[0].body }))
    .catch(next);
};

const getComments = (req, res, next) => {
  retrieveComments(req.params.article_id, req.query)
    .then(result => res.status(200).send(result))
    .catch(next);
};

module.exports = {
  selectArticles,
  patchArticle,
  postArticleComment,
  getComments,
  selectAllArticles
};
