const connection = require('../connection');

const getArticles = articleId => {
  return connection
    .select('*')
    .from('articles')
    .whereRaw(`articles.article_id = ${articleId}`);
};

const updateArticle = (articleId, update) => {
  if (update.inc_votes > 0) {
    return connection('articles')
      .where('article_id', '=', articleId)
      .increment({ votes: update.inc_votes })
      .returning('*');
  } else {
    return connection('articles')
      .where('article_id', '=', articleId)
      .decrement({ votes: Math.abs(update.inc_votes) })
      .returning('*');
  }
};

const postComment = (requestObj, articleId) => {
  return connection('comments')
    .insert({
      body: requestObj.body,
      author: requestObj.username,
      article_id: articleId.article_id
    })
    .into('comments')
    .returning('*');
};

const retrieveComments = (articleId, query) => {
  if (!query.sort_by) {
    sortBy = 'created_at';
  } else sortBy = query.sort_by;
  if (!query.order_by) {
    orderBy = 'desc';
  } else orderBy = query.order_by;

  return connection
    .select('comments_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .where('comments.article_id', '=', articleId)
    .orderBy(sortBy, orderBy);
};

module.exports = { getArticles, updateArticle, postComment, retrieveComments };
