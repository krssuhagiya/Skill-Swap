const express = require('express');
const router = express.Router();
const profileController = require('../controllers/userProfile.controller');

// Create or update profile
router.post('/', profileController.upsertProfile);

// Get profile by userId
router.get('/:userId', profileController.getProfile);

// Delete profile by userId
router.delete('/:userId', profileController.deleteProfile);

module.exports = router;