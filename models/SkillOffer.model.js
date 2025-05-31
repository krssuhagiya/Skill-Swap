const mongoose = require("mongoose");

const skillOfferSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    availability: {
      type: [String], // e.g., ["Weekends", "Evenings"]
      default: [],
    },
    mode: {
      type: String,
      enum: ["online", "in-person", "both"],
      default: "online",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SkillOffer", skillOfferSchema);
