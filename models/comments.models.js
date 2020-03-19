const connection = require('../connection');

const updateComment = (commentId, update) => {
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
};

const iWillDeleteYou = commentId => {
  return connection('comments')
    .where({ comments_id: commentId })
    .del();
};

module.exports = { updateComment, iWillDeleteYou };
