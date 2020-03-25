const commentsRouter = require('express').Router();
const {
  retrieveUpdatedComment,
  mattHardy
} = require('../controllers/comments.controllers');

commentsRouter
  .route('/:comment_id')
  .patch(retrieveUpdatedComment)
  .delete(mattHardy)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });
module.exports = commentsRouter;
