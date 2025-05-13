const express = require('express');
const router = express.Router();
const interestController = require('../controllers/interestController');

router.post('/send', interestController.sendInterest);

module.exports = router;