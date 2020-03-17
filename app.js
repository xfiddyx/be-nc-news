const express = require('express');

const apiRouter = require('./routes/api.router');
const { statusCodeErrors } = require('./errors/app.errors');
const { psqlErrors } = require('./errors/psql.errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(statusCodeErrors);
app.use(psqlErrors);

module.exports = app;
