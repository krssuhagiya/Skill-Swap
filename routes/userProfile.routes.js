const express = require("express");
const router = express.Router();
const profileController = require("../controllers/userProfile.controller");
const authController = require("../middleware/auth");

// ✅ Me route must come BEFORE dynamic route
router.get("/me", authController, profileController.meProfile);

// Create or update profile
router.post("/", authController, profileController.upsertProfile);

// Get profile by userId
router.get("/:userId", profileController.getProfile);

// Delete profile by userId
router.delete("/:userId", profileController.deleteProfile);

// Get all profiles
router.get("/", profileController.getAllProfiles);

module.exports = router;
