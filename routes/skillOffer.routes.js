const express = require('express');
const router = express.Router();
const skillOfferController = require('../controllers/skillOffer.controller');
const authMiddleware = require("../middleware/auth");

// POST: Create a skill offer
router.post('/',authMiddleware, skillOfferController.createSkillOffer);

// GET: All offers
router.get('/', skillOfferController.getAllOffers);

// GET: Offers by user
router.get('/user/:userId', skillOfferController.getOffersByUser);

// DELETE: Delete an offer by ID
router.delete('/:id',authMiddleware, skillOfferController.deleteOffer);

// search skills 
router.get("/search", skillOfferController.searchOffers);

module.exports = router;
