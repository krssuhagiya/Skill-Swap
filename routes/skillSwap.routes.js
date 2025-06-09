const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // your JWT auth middleware
const skillSwapController = require('../controllers/skillSwap.controller');

// Send a swap request
router.post('/send', auth, skillSwapController.sendSwapRequest);

// Get swap requests (sent and received) by user ID
router.get('/user/:userId', auth, skillSwapController.getUserSwapRequests);

// Update status of a request (accept/reject/complete)
router.put('/status/:requestId', auth, skillSwapController.updateSwapStatus);

module.exports = router;