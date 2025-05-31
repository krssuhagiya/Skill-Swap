const SkillOffer = require("../models/SkillOffer.model");

// create skill offer
exports.createSkillOffer = async (req, res) => {
  try {
    const { userId, skillName, category, description, availability, mode } =
      req.body;

    const offer = new SkillOffer({
      userId,
      skillName,
      category,
      description,
      availability,
      mode,
    });
    await offer.save();
    res
      .status(201)
      .json({ message: "Skill offer created successfully", offer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all skill offer
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await SkillOffer.find().populate("userId", "name email");
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get offers by userId
exports.getOffersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const offers = await SkillOffer.find({ userId });
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete offer by ID
exports.deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SkillOffer.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Offer not found' });

    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
