var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const User = require('./models/User');

const Developer = require('./models/Developer');
const Technician = require('./models/Technician');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/auth-user');
var devsRouter = require('./routes/auth-dev');
var techsRouter = require('./routes/auth-tech');
var commercialsRouter = require('./routes/auth-com');
var shop = require('./routes/shop');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/devs', devsRouter);
app.use('/techs', techsRouter);
app.use('/commercials', commercialsRouter);
app.use('/shop', shop);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
