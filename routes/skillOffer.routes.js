const express = require('express');
const router = express.Router();
const skillOfferController = require('../controllers/skillOffer.controller');

// POST: Create a skill offer
router.post('/', skillOfferController.createSkillOffer);

// GET: All offers
router.get('/', skillOfferController.getAllOffers);

// GET: Offers by user
router.get('/user/:userId', skillOfferController.getOffersByUser);

// DELETE: Delete an offer by ID
router.delete('/:id', skillOfferController.deleteOffer);

module.exports = router;
