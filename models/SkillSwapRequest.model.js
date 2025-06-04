const mongoose = require('mongoose');

const skillSwapRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Requester
      ref: 'User',
      required: true,
    },
    targetUserId: {
      type: mongoose.Schema.Types.ObjectId, // Receiver
      ref: 'User',
      required: true,
    },
    skillOffered: {
      type: String,
      required: true,
      trim: true,
    },
    skillWanted: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    availability: {
      type: [String], // e.g., ['Weekends', 'Evenings']
      default: [],
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SkillSwapRequest', skillSwapRequestSchema);
