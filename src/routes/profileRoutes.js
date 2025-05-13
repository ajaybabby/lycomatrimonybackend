const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/', profileController.createProfile);
router.get('/:id', profileController.getProfileById);
router.get('/', profileController.getAllProfiles);
router.get('/:id/matches', profileController.getMatches);
router.get('/users/:userId', profileController.getUserDetails);
router.post('/:id/preferences', profileController.savePreferences); // Add this line

module.exports = router;


