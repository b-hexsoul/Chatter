const db = require("../model");

// @desc    Get all conversations for a user
// @route   GET /api/conversation/
// @access  Public
exports.getAllUserConversations = async (req, res) => {
  let userId = req.body.userId;

  try {
    let conversations = await db.User.findAll({
      raw: true,
      where: {
        id: userId,
      },
      attributes: ["username"],
      include: [{ model: db.Conversation, through: {} }],
    });

    if (!conversations) {
      return res.status(400).json({ success: false, msg: "No conversations" });
    }

    return res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
};
