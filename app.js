var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var nunjucks = require('express-nunjucks');
var jwtMidleware = require('express-jwt');
var jwt = require('jsonwebtoken');



var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.set('view engine', 'twig.html');

// Templates in this directory will override the application templates.
app.set('views', __dirname + '/views');

// Configuring the template system.
nunjucks.setup({
    // (default: true) controls if output with dangerous characters are escaped automatically.
    autoescape: true,
    // (default: false) throw errors when outputting a null/undefined value.
    throwOnUndefined: false,
    // (default: false) automatically remove trailing newlines from a block/tag.
    trimBlocks: false,
    // (default: false) automatically remove leading whitespace from a block/tag.
    lstripBlocks: false,
    // (default: false) if true, the system will automatically update templates when they are changed on the filesystem.
    watch: true,
    // (default: false) if true, the system will avoid using a cache and templates will be recompiled every single time.
    noCache: true,
    // (default: see nunjucks syntax) defines the syntax for nunjucks tags.
    tags: {}
}, app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;