const express = require('express');
const router = express.Router();
const votingControllers = require('./controllers/voting.controller');
const isAuthenticated = require('../middlewares/loginAuth');

router.get('/new', isAuthenticated, votingControllers.showCreateVote);
router.post('/new', isAuthenticated, votingControllers.createVote);
router.get('/success', isAuthenticated, votingControllers.showSuccessPage);
router.get('/:vote_id', votingControllers.showVotePage);
router.post('/:vote_id/delete', isAuthenticated, votingControllers.deleteVote);

module.exports = router;
