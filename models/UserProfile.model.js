const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Each user should have only one profile
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    skillsOffered: {
      type: [String],
      default: [],
    },
    skillsWanted: {
      type: [String],
      default: [],
    },
    timeCredits: {
      type: Number,
      default: 0,
      min: 0,
    },
    availability: {
      type: [String], // e.g., ['Weekdays', 'Evenings']
      default: [],
    },
    location: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
