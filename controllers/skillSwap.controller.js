const SkillSwapRequest = require("../models/SkillSwapRequest.model");

// Send a skill swap request
exports.sendSwapRequest = async (req, res) => {
  try {
    const userId = req.user; // ✅ from auth middleware
    const { targetUserId, skillOffered, skillWanted, availability, message } =
      req.body;

    const request = new SkillSwapRequest({
      userId,
      targetUserId,
      skillOffered,
      skillWanted,
      availability,
      message,
    });

    await request.save();
    res.status(201).json({ message: "Swap request sent!", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all swap requests for a user (as receiver or requester)
exports.getUserSwapRequests = async (req, res) => {
  try {
    const userId = req.user; // since you used `req.user = verified.id`
    const { type = "all", status } = req.query;

    let query = {};

    if (type === "sent") {
      query.userId = userId;
    } else if (type === "received") {
      query.targetUserId = userId;
    } else {
      query = {
        $or: [{ userId }, { targetUserId: userId }],
      };
    }

    if (status) {
      query.status = status; // filters only accepted/rejected/etc
    }

    const swaps = await SkillSwapRequest.find(query)
      .populate("userId", "username email")
      .populate("targetUserId", "username email");

    res.status(200).json(swaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status of a request
exports.updateSwapStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await SkillSwapRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Status updated", request: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
