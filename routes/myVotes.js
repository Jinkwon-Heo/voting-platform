const express = require('express');
const router = express.Router();
const myVotesController = require('./controllers/myVotes.controller');
const onlyLoggedInCanView = require('../middlewares/loginAuth');

router.get('/', onlyLoggedInCanView, myVotesController.showMyVotes);

module.exports = router;
