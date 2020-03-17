const express = require('express');

const apiRouter = require('./routes/api.router');
const errors = require('./errors/app.errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(errors);

module.exports = app;
