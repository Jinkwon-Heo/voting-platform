const express = require('express');
const router = express.Router();
const myVotesController = require('./controllers/myVotes.controller');

router.get('/', myVotesController.showMyVotes);

module.exports = router;
