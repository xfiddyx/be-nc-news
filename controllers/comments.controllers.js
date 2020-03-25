const { updateComment, iWillDeleteYou } = require('../models/comments.models');

const retrieveUpdatedComment = (req, res, next) => {
  updateComment(req.params.comment_id, req.body)
    .then(comment => {
      if (comment.length === 0) {
        next(404);
      } else res.status(200).send({ comment: comment[0] });
    })
    .catch(next);
};

const mattHardy = (req, res, next) => {
  iWillDeleteYou(req.params.comment_id)
    .then(result => {
      if (result === 0) {
        next(404);
      } else {
        res.status(204).send();
      }
    })
    .catch(next);
};
module.exports = { retrieveUpdatedComment, mattHardy };
