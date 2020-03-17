const { getArticles } = require('../models/articles.models');

const selectArticles = (req, res, next) => {
  getArticles(req.params.article_id)
    .then(article => {
      console.log(article);
      if (article.length === 0) {
        return next(404);
      } else res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = { selectArticles };
