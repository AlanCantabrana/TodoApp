const express = require('express');

const app = express();

app.use(require('./todos'));

module.exports = app;