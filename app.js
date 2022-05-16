require('dotenv').config();
require('./config/database');
require('./passport/passport');

const express = require('express');
const app = express();

const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const createError = require('http-errors');

const mainPage = require('./routes/mainPage');
const login = require('./routes/login');
const signup = require('./routes/signup');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.set('layout extractScripts', true);

app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sessionStore = new mongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions',
});

app.use(session({
  store: sessionStore,
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainPage);
app.use('/login', login);
app.use('/signup', signup);

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
