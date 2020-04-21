const {
  getArticles,
  updateArticle,
  postComment,
  retrieveComments,
  getAllArticles,
} = require('../models/articles.models');

const selectAllArticles = (req, res, next) => {
  getAllArticles(req.query)
    .then((articles) => {
      if (!req.query.author && !req.query.topic) {
        res.status(200).send({ articles });
      } else if (req.query.author) {
        const article = articles.filter(
          (article) => article.author === req.query.author
        );
        res.status(200).send({ articles: article });
      } else if (req.query.topic) {
        const article = articles.filter(
          (article) => article.topic === req.query.topic
        );
        res.status(200).send({ articles: article });
      }
    })
    .catch(next);
};

const selectArticle = (req, res, next) => {
  getArticles(req.params.article_id)
    .then((articles) => {
      if (articles.length === 0) {
        return next(404);
      } else res.status(200).send({ article: articles[0] });
    })
    .catch(next);
};

const getRandomArticle = (req, res, next) => {
  getAllArticles(req.query)
    .then((articles) => {
      console.log('i am here');
      const randomArticle =
        articles[Math.floor(Math.random() * articles.length)];
      res.status(200).send({ article: randomArticle });
    })
    .catch(next);
};

const patchArticle = (req, res, next) => {
  updateArticle(req.params.article_id, req.body)
    .then((updated_article) =>
      res.status(200).send({ article: updated_article[0] })
    )
    .catch(next);
};

const postArticleComment = (req, res, next) => {
  postComment(req.body, req.params)
    .then((result) => {
      res.status(201).send({ comment: result[0] });
    })
    .catch(next);
};

const getComments = (req, res, next) => {
  retrieveComments(req.params.article_id, req.query)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

module.exports = {
  selectArticle,
  patchArticle,
  postArticleComment,
  getComments,
  selectAllArticles,
  getRandomArticle,
};
