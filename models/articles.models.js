const connection = require('../connection');

const getAllArticles = (query) => {
  let sortBy = 'created_at';
  let ord = 'desc';
  if (Object.entries(query).length) {
    if (query.sort_by) sortBy = query.sort_by;
    if (query.order) ord = query.order;
  }
  let checker;
  if (query.topic) {
    checker = checkExists('topics', 'slug', query.topic);
  } else if (query.author) {
    checker = checkExists('users', 'username', query.author);
  } else checker = 'nothing to check';

  const articlesData = connection
    .select(
      'articles.author',
      'articles.title',
      'articles.article_id',
      'articles.topic',
      'articles.created_at',
      'articles.votes'
    )
    .from('articles')
    .count({ comment_count: 'comments.article_id' })
    .leftOuterJoin(
      'comments',
      'articles.article_id',
      '=',
      'comments.article_id'
    )
    .groupBy('articles.article_id')
    .orderBy(sortBy, ord);

  return Promise.all([checker, articlesData]).then(
    ([checker, articlesData]) => {
      if (!checker) {
        return Promise.reject(404);
      } else return articlesData;
    }
  );
};
const getArticles = (articleId) => {
  return connection
    .select(
      'articles.author',
      'articles.title',
      'articles.article_id',
      'articles.topic',
      'articles.created_at',
      'articles.votes',
      'articles.body'
    )
    .from('articles')
    .where('articles.article_id', articleId)
    .count({ comment_count: 'comments.article_id' })
    .leftOuterJoin(
      'comments',
      'articles.article_id',
      '=',
      'comments.article_id'
    )
    .groupBy('articles.article_id');
};

const updateArticle = (articleId, update) => {
  if (isNaN(update.inc_votes) && Object.keys(update).length) {
    return Promise.reject(400);
  }

  if (update.inc_votes > 0) {
    return connection('articles')
      .where('article_id', '=', articleId)
      .increment({ votes: update.inc_votes })
      .returning('*');
  } else if (update.inc_votes < 0) {
    return connection('articles')
      .where('article_id', '=', articleId)
      .decrement({ votes: Math.abs(update.inc_votes) })
      .returning('*');
  } else
    return connection('articles')
      .where('article_id', '=', articleId)
      .returning('*');
};

const postComment = (requestObj, articleId) => {
  return connection('comments')
    .insert({
      body: requestObj.body,
      author: requestObj.username,
      article_id: articleId.article_id,
    })
    .into('comments')
    .returning('*');
};

const retrieveComments = (articleId, query) => {
  if (!query.sort_by) {
    sortBy = 'created_at';
  } else sortBy = query.sort_by;
  if (!query.order) {
    ord = 'desc';
  } else ord = query.order;

  const comments = connection
    .select('comments.comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .where('comments.article_id', '=', articleId)
    .orderBy(sortBy, ord);
  return Promise.all([
    checkExists('articles', 'article_id', articleId),
    comments,
  ]).then(([value, comments]) => {
    if (!value) {
      return Promise.reject(404);
    } else return comments;
  });
};
const checkExists = (table, column, query) => {
  return connection(table)
    .select()
    .where({ [column]: query })
    .first();
};

module.exports = {
  getArticles,
  updateArticle,
  postComment,
  retrieveComments,
  getAllArticles,
};
