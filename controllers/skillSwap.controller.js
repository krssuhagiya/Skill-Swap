const SkillSwapRequest = require('../models/SkillSwapRequest');

// Send a skill swap request
exports.sendSwapRequest = async (req, res) => {
  try {
    const { userId, targetUserId, skillOffered, skillWanted, availability, message } = req.body;

    const request = new SkillSwapRequest({
      userId,
      targetUserId,
      skillOffered,
      skillWanted,
      availability,
      message,
    });

    await request.save();
    res.status(201).json({ message: 'Swap request sent!', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all swap requests for a user (as receiver or requester)
exports.getUserSwapRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    const sent = await SkillSwapRequest.find({ userId }).populate('targetUserId', 'username email');
    const received = await SkillSwapRequest.find({ targetUserId: userId }).populate('userId', 'username email');

    res.status(200).json({ sent, received });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status of a request
exports.updateSwapStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updated = await SkillSwapRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Request not found' });

    res.status(200).json({ message: 'Status updated', request: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
