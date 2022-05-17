const express = require('express');
const router = express.Router();
const myVotesController = require('./controllers/myVotes.controller');
const isAuthenticated = require('../middlewares/loginAuth');

router.get('/', isAuthenticated, myVotesController.showMyVotes);

module.exports = router;
