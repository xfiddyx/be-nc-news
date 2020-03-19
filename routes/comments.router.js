const commentsRouter = require('express').Router();
const { updateComments } = require('../controllers/comments.controllers');

commentsRouter
  .route('/:comment_id')
  .patch(updateComments)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'method not found' });
  });
