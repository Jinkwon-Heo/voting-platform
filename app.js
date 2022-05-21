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
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const mainPage = require('./routes/mainPage');
const login = require('./routes/login');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
const myVotes = require('./routes/myVotes');
const voting = require('./routes/voting');
const { PAGE_NOT_FOUND } = require('./constants/errorMessage');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.set('layout extractScripts', true);

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "/public")));
app.use('/util', express.static(path.join(__dirname, './util')));
app.use(express.static(path.join(__dirname, './services')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

const sessionStore = new mongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions',
});

app.use(cookieParser(process.env.SECRET_KEY))
app.use(function(req, res, done) {
  const isHealthCheck = req.url.indexOf('healthCheck') > -1;
  session({
    store: isHealthCheck || sessionStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1800000,
      secure: false,
    }
  })(req, res, done);
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainPage);
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/myVotes', myVotes);
app.use('/voting', voting);

app.use(function(req, res, next) {
  next(createError(404, PAGE_NOT_FOUND));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
