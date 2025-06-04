const UserProfile = require("../models/UserProfile.model");

// Create or update user profile
exports.upsertProfile = async (req, res) => {
  try {
    const {
      userId,
      bio,
      skillsOffered,
      skillsWanted,
      timeCredits,
      availability,
      location,
    } = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { bio, skillsOffered, skillsWanted, timeCredits, availability, location },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: "Profile saved successfully", profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get profile by userId
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await UserProfile.findOne({ userId }).populate(
      "userId",
      "name email"
    );

    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find().populate("userId", "username email");
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// delete profile by userId
exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await UserProfile.findOneAndDelete({ userId });

    if (!result) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json({ message: "Profile deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

