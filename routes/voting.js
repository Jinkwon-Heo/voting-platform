const express = require('express');
const router = express.Router();
const votingControllers = require('./controllers/voting.controller');

router.get('/new', votingControllers.showCreateVote);
router.get('/success', votingControllers.showSuccessPage);
router.post('/new', votingControllers.createVote);

module.exports = router;
