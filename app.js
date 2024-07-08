const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');

const checkLoggedIn = require('./middlewares/checkLoggedIn');

const indexRouter = require('./routes/index');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();
app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: true,
}));

app.use(checkLoggedIn);

app.use('/', indexRouter);
app.use('/usuarios', userRoutes);
app.use('/autenticacao', authRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.error = {
    message: err.message,
    status: err.status || 500,
    stack: req.app.get('env') === 'development' ? err.stack : '',
  };

  res.status(res.locals.error.status);
  res.render('error');
});

module.exports = app;
