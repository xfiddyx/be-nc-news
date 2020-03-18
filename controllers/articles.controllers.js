const {
  getArticles,
  updateArticle,
  postComment,
  retrieveComments
} = require('../models/articles.models');

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
  getComments
};
