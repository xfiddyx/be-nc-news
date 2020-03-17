const connection = require('../connection');

const getArticles = articleId => {
  return connection
    .select('*')
    .from('articles')
    .whereRaw(`articles.article_id = ${articleId}`);
};

module.exports = { getArticles };
