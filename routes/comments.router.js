const commentsRouter = require('express').Router();
const {
  retrieveUpdatedComment,
  reqDelete
} = require('../controllers/comments.controllers');

commentsRouter
  .route('/:comment_id')
  .patch(retrieveUpdatedComment)
  .delete(reqDelete)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });
module.exports = commentsRouter;
