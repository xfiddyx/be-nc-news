const { updateComment, deleteComment } = require('../models/comments.models');

const retrieveUpdatedComment = (req, res, next) => {
  updateComment(req.params.comment_id, req.body)
    .then(comment => {
      if (comment.length === 0) {
        next(404);
      } else res.status(200).send({ comment: comment[0] });
    })
    .catch(next);
};

const reqDelete = (req, res, next) => {
  deleteComment(req.params.comment_id)
    .then(result => {
      if (result === 0) {
        next(404);
      } else {
        res.status(204).send();
      }
    })
    .catch(next);
};
module.exports = { retrieveUpdatedComment, reqDelete };
