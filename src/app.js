const express = require('express');
const bodyParser = require('body-parser');
const api=require('./controller/api.controller')
const user = require('../src/controller/user.controller');
const task = require('../src/controller/task.controller');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', api)
app.use('/user', user);
app.use('/task', task);

app.use((error, req, res, _next) => {
  res.send(error.message);
});

module.exports = app;
