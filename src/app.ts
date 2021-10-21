import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as utils from './utils';
import api from './config/api';

Promise = require('bluebird');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  res.locals.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, _next) {
  res.status(res.locals.status || 500);
  utils.sendResponse(res.status(err.status || 500), 0, err.message, null, err);
});

module.exports = app;
