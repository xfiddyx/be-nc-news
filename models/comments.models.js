const connection = require('../connection');

const updateComment = (commentId, update) => {
  let checker = checkExists('comments', 'comments_id', commentId);
  return Promise.all([checker, update]).then(([checker, update]) => {
    if (checker && !Object.keys(update).length) {
      return [checker];
    }
    if (update.inc_votes > 0) {
      return connection('comments')
        .where('comments_id', '=', commentId)
        .increment({ votes: update.inc_votes })
        .returning('*');
    } else {
      return connection('comments')
        .where('comments_id', '=', commentId)
        .decrement({ votes: Math.abs(update.inc_votes) })
        .returning('*');
    }
  });
};

const iWillDeleteYou = commentId => {
  return connection('comments')
    .where({ comments_id: commentId })
    .del();
};

const checkExists = (table, column, query) => {
  return connection(table)
    .select()
    .where({ [column]: query })
    .first();
};

module.exports = { updateComment, iWillDeleteYou };
