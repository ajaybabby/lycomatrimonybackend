const express = require('express');
const router = express.Router();
const astrologyController = require('../controllers/astrologyController');

router.post('/:userId', astrologyController.saveAstrologyPreferences);
router.get('/:userId', astrologyController.getAstrologyPreferences);
router.post('/search', astrologyController.searchByPreferences);

module.exports = router;