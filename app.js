const express = require('express');
const cors = require('cors');

const apiRouter = require('./routes/api.router');
const { statusCodeErrors } = require('./errors/app.errors');
const { psqlErrors } = require('./errors/psql.errors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use(statusCodeErrors);

app.use(psqlErrors);

module.exports = app;
