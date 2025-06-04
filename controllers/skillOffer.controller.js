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
    const offers = await SkillOffer.find().populate("userId", "username email");
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
    if (!deleted) return res.status(404).json({ message: "Offer not found" });

    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update offer
exports.updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await SkillOffer.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Offer not found" });

    res.status(200).json({ message: "Offer updated", offer: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search offers by skill name, category, or mode
exports.searchOffers = async (req, res) => {
  try {
    const { skill, category, mode } = req.query;

    const filter = {};

    if (skill) {
      filter.skillName = { $regex: skill, $options: "i" }; // case-insensitive partial match
    }

    if (category) {
      filter.category = category;
    }

    if (mode) {
      filter.mode = mode; // e.g., 'online' or 'in-person'
    }

    const offers = await SkillOffer.find(filter).populate(
      "userId",
      "username email"
    );

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
