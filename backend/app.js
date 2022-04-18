var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config.json');
var cors = require('cors');
var https = require('https');
var http = require('http');
const fs = require('fs');

var indexRouter = require('./routes/index');

var app = express();

app.use(express.static(__dirname + '/public'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup the logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.sendFile('./public/html/error.html', {root: config.root});
});

http.createServer(app).listen(config.port, () => {
  console.log(`Books listening at http://localhost:${config.port}`)
});

module.exports = app;
